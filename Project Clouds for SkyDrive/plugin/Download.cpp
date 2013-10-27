/**  
    Some methods in this file are from the FileTree sample. 
 *  These methods are copyright of HP and Manas Coding claims no ownership of these methods.
 *  Copyright (C) 2010 Hewlett Packard, Inc.  All rights reserved.
 *  Other methods are copyright Manas Coding 2012. 
**/
/*
 * To see which methods are made by Manas Coding please see the FileTree sample made by HP.
 *  */
 

/* Standard C headers */
#include <stdio.h>
#include <stdio.h>
#include <time.h>
#include <syslog.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <glob.h>
#include <sys/wait.h>

     
/* HP webOS PDK headers */
#include "SDL.h"
#include "PDL.h"


static void fputs_json(const char *s, FILE *f) 
{
    unsigned int ch;
    if (!s) return;

    fputc('\"', f);
    while ((ch = *s++) != 0) {
        if (ch > 31 && ch != '\"' && ch != '\\') {
            fputc(ch, f);
        }
        else {
            switch (ch) {
                /* escaping forward slash ('/') is allowed in input, 
                   but not required on output */
                case '\\': fputs("\\\\", f); break;
                case '\"': fputs("\\\"", f); break;
                case '\b': fputs("\\b", f); break;
                case '\f': fputs("\\f", f); break;
                case '\n': fputs("\\n", f); break;
                case '\r': fputs("\\r", f); break;
                case '\t': fputs("\\t", f); break;
                default:   fprintf(f, "\\u%04x", ch); break;
            }
        }
    }
    fputc('\"', f);
}

static void OutputFileListing(FILE *f, const char *directory, const char *pattern)
{
    // skip a leading slash since we always start at root
    if (directory[0] == '/') ++directory;

    // build the directory part of the pattern
    char *fullpath = NULL;
    asprintf(&fullpath, "/%s", directory);
    if (!fullpath) { exit(1); }
    
    // avoid duplicated slashes at end
    int dirlen = strlen(fullpath);
    if (fullpath[dirlen - 1] == '/') {
        fullpath[dirlen - 1] = 0;
        --dirlen;
    }
    
    char *fullpattern = NULL;
    asprintf(&fullpattern, "%s/%s", fullpath, pattern);
    if (!fullpattern) { exit(1); }
    
    fputs("[\n", f);
    glob_t matches;
    // this call actually does the directory search
    if (0 == glob(fullpattern, GLOB_BRACE, NULL, &matches)) {
        bool first = true;

        // now we process all the matches and output the good ones
        for (int i = 0; i < matches.gl_pathc; ++i) {
            const char *name = matches.gl_pathv[i];
            struct stat details;
            if (0 != stat(name, &details)) {
                // if we can't get file details, go to next one
                continue;
            }

            // output a file entry for regular files
            if (S_ISREG(details.st_mode)) {
                // output comma separators before all but the first filename
                if (!first) {
                    fputs(",\n", f); 
                }
                first = false;

                fputs("  { \"type\":\"file\", \"name\": ", f);
                fputs_json(name + dirlen + 1, f);
                fprintf(f, ", \"size\": %d, \"date\": \"", details.st_size);

                char isodate[20];
                struct tm modtime;
                localtime_r(&details.st_mtime, &modtime);
                strftime (isodate, 20, "%F %T", &modtime);
                fputs(isodate, f);

                fputs("\" }", f);
            }
            // output a directory entry for 
            else if (S_ISDIR(details.st_mode)) {
                // output comma separators before all but the first filename
                if (!first) {
                    fputs(",\n", f); 
                }
                first = false;

                fputs("  { \"type\":\"directory\", \"name\": ", f);
                fputs_json(name + dirlen + 1, f);
                fputs(", \"date\": \"", f);

                char isodate[20];
                struct tm modtime;
                localtime_r(&details.st_mtime, &modtime);
                strftime (isodate, 20, "%F %T", &modtime);
                fputs(isodate, f);

                fputs("\" }", f);
            }
            
        }
    }
    fputs("\n]", f);
    
    globfree(&matches);

    free(fullpattern);
    free(fullpath);
}

static void OutputFileListingToJS(const char *directory, const char *pattern)
{
    char *buffer;
    size_t bufferLength = 0;

    // output the file listing to our memory buffer, fclose will flush changes
    FILE *f = open_memstream(&buffer, &bufferLength);
    OutputFileListing(f, directory, pattern);
    fclose(f);
    
    // send data back to the JavaScript side
    syslog(LOG_WARNING, "*** returning results");
    PDL_Err err;
    err = PDL_CallJS("getFilesResult", (const char **)&buffer, 1);
    if (err) {
        syslog(LOG_ERR, "*** PDL_CallJS failed, %s", PDL_GetError());
        //SDL_Delay(5);
    }
    
    // now that we're done, free our working memory
    free(buffer);
}

static int RunCommandLineTests(int argc, char** argv)
{
    if (argc == 4 && 0 == strcmp(argv[1], "-f")) {
        OutputFileListing(stdout, argv[2], argv[3]);
    }
    else {
        fprintf(stderr, "%s USAGE:\n"
                        "  no parameters for use as plugin\n"
                        "  -f <dir> <pattern>, to output file list\n", 
                argv[0]);
    }
    
    // even if we didn't process any parameters, we'll exit early.
    return 1;
}

static PDL_bool getFiles(PDL_JSParameters *params)
{
    if (PDL_GetNumJSParams(params) != 2) {
        syslog(LOG_INFO, "**** wrong number of parameters for getFiles");
        PDL_JSException(params, "wrong number of parameters for getFiles");
        return PDL_FALSE;
    }

    /* parameters are directory, pattern */
    const char *directory = PDL_GetJSParamString(params, 0);
    const char *pattern = PDL_GetJSParamString(params, 1);

    /* since we don't process this in the method thread, instead post a
     * SDL event that will be received in the main thread and used to 
     * launch the code. */
    SDL_Event event;
    event.user.type = SDL_USEREVENT;
    event.user.code = 0;
    event.user.data1 = strdup(directory);
    event.user.data2 = strdup(pattern);

    syslog(LOG_WARNING, "*** sending getFiles event");
    SDL_PushEvent(&event);
    
    return PDL_TRUE;
}

static PDL_bool saveFile(PDL_JSParameters *params)
{
    syslog(LOG_WARNING, "*** SAVING FILE");
    if (PDL_GetNumJSParams(params) != 2) {
        syslog(LOG_INFO, "**** wrong number of parameters for saveFile");
        PDL_JSException(params, "wrong number of parameters for saveFile");
        return PDL_FALSE;
    }
    
    const char *fileName = PDL_GetJSParamString(params, 0);
    const char *fileText = PDL_GetJSParamString(params, 1);
    
    SDL_Event event;
    event.user.type = SDL_USEREVENT;
    event.user.code = 1;
    event.user.data1 = strdup(fileName);
    event.user.data2 = strdup(fileText);
    
    
    syslog(LOG_WARNING, "*** sending saveFile event");
    SDL_PushEvent(&event);
    
    return PDL_TRUE;
    
    
}


static PDL_bool openFile(PDL_JSParameters *params)
{
    if (PDL_GetNumJSParams(params) != 1) {
        syslog(LOG_INFO, "**** wrong number of parameters for openFile");
        PDL_JSException(params, "wrong number of parameters for openFile");
        return PDL_FALSE;
    }
    
    const char *fileName = PDL_GetJSParamString(params, 0);
    
    SDL_Event event;
    event.user.type = SDL_USEREVENT;
    event.user.code = 2;
    event.user.data1 = strdup(fileName);
    
    
    
    syslog(LOG_WARNING, "*** sending openFile event");
    SDL_PushEvent(&event);
    
    return PDL_TRUE;
}


static PDL_bool createDir(PDL_JSParameters *params)
{
    if (PDL_GetNumJSParams(params) != 1) {
        syslog(LOG_INFO, "**** wrong number of parameters for removeFile");
        PDL_JSException(params, "wrong number of parameters for removeFile");
        return PDL_FALSE;
    }
    
    const char *dirName = PDL_GetJSParamString(params, 0);
    
    SDL_Event event;
    event.user.type = SDL_USEREVENT;
    event.user.code = 4;
    event.user.data1 = strdup(dirName);
    
    
    
    syslog(LOG_WARNING, "*** sending removeFile event");
    SDL_PushEvent(&event);
    
    return PDL_TRUE;
    
}


static PDL_bool getUpload(PDL_JSParameters *parms)
{
     syslog(LOG_INFO, "**** Got here");
      int num =  PDL_GetNumJSParams(parms);
      if (num==2) {
      const char * url = PDL_GetJSParamString(parms, 0);
      const char * file = PDL_GetJSParamString(parms, 1);
           
      SDL_Event event;
      event.user.type = SDL_USEREVENT;
      event.user.code = 3;
      
      syslog(LOG_WARNING, "****** %s\n", url);
      syslog(LOG_WARNING, "****** %s\n", file);
      event.user.data1 = strdup(url);
      event.user.data2 = strdup(file);     
      syslog(LOG_WARNING, "*** sending uploadFile event");
      SDL_PushEvent(&event);     
      
      syslog(LOG_INFO, "**** Still Here TWooooo");
      //PDL_JSReply(parms, "Sucess");
      return PDL_TRUE;
  }
  else{
      syslog(LOG_INFO, "**** wrong number of parameters for getFiles");
      //PDL_JSReply(parms, "Fail");
      PDL_JSException(parms, "wrong number of parameters for getFiles");
      return PDL_FALSE;
  }
}

int main(int argc, char** argv)
{
    // Initialize the SDL library with the Video subsystem
    int result = SDL_Init(SDL_INIT_VIDEO);
   
    if ( result != 0 ) {
        printf("Could not init SDL: %s\n", SDL_GetError());
        exit(1);
    }

    PDL_Init(0);

    // look for special -f switch to test getFiles from command line
    if (!PDL_IsPlugin()) {
        RunCommandLineTests(argc, argv);
        return 0;
    }
        
    
    // register the js callback
    PDL_RegisterJSHandler("getFiles", getFiles);
    PDL_RegisterJSHandler("saveFile", saveFile);
    PDL_RegisterJSHandler("openFile", openFile);
    PDL_RegisterJSHandler("createDir", createDir);
    PDL_RegisterJSHandler("getUpload", getUpload);
    
    PDL_JSRegistrationComplete();

    // call a "ready" callback to let JavaScript know that we're initialized
    PDL_CallJS("ready", NULL, 0);
    syslog(LOG_INFO, "**** Registered");

    // Event descriptor
    SDL_Event event;
    do {
        SDL_WaitEvent(&event);
        syslog(LOG_INFO, "**** SDL_WaitEvent returned with event type %d", event.type);
        
        if (event.type == SDL_USEREVENT && event.user.code == 0) {
            syslog(LOG_WARNING, "*** processing getFiles event");
            /* extract our arguments */
            char *directory = (char *)event.user.data1;
            char *pattern = (char *)event.user.data2;

            /* call our output function */
            OutputFileListingToJS(directory, pattern);

            /* free memory since this event is processed now */
            free(directory);
            free(pattern);
        }
        
        
        
        if(event.type == SDL_USEREVENT && event.user.code == 1){
            syslog(LOG_WARNING, "*** processing saveFile event");
            
            FILE * fp;
            char * fileName = (char*) event.user.data1;
            char * text = (char *) event.user.data2;
            fp = fopen(fileName, "w");
            if(fp != NULL){
                
                fprintf(fp, "%s", text);
                syslog(LOG_WARNING, "*** Finalizing saveFile event");
                syslog(LOG_WARNING, "*** %s\n", fileName);
                syslog(LOG_WARNING, "*** %s\n", text);
                fclose(fp);
                PDL_CallJS("getSaveResult", (const char **)&fileName, 1);
                
            }
            else{
                char * success = "FAIL";
                PDL_CallJS("getSaveResult", (const char **)&success, 1);
            }
            
        }
        
        if (event.type == SDL_USEREVENT && event.user.code == 2) {
            syslog(LOG_WARNING, "*** processing openFile event");
            FILE * fp;
            char * fileName = (char*) event.user.data1;
            fp = fopen(fileName, "r");
            if (fp == NULL) {
                const char * answers[2];
                answers[0] = "";
                answers[1] = "FAIL";
                PDL_CallJS("getOpenResult", answers, 2);
            }
            else {
                
                syslog(LOG_WARNING, "*** processing openFile File Opened");
                int size = 0;
                int maxSize = 50;

                char * string = (char *) malloc(sizeof (char *) * maxSize);
                char end = '\0';
                char charOne;
                syslog(LOG_WARNING, "*** BEFORE LOOP");
                while (( charOne = fgetc(fp)) !=  'ÿ') {
                    
                    string[size] = charOne;
                    size++;

                    
                    if (size == maxSize - 1) {
                        maxSize = maxSize * 2;
                        string = (char *) realloc(string, sizeof (char *) * maxSize);
                        
                    }
                   

                }
                string[size] = end;
                
                fclose(fp);
                syslog(LOG_WARNING, "*** AFTER LOOP");
                const char * answers[2];
                answers[0] = string;
                answers[1] = fileName;
                
                PDL_CallJS("getOpenResult", answers, 2);
            }


        }
        
        if (event.type = SDL_USEREVENT && event.user.code == 3) {
            syslog(LOG_WARNING, "*** processing uploadFile event");
            /* extract our arguments */
            char *url = (char *)event.user.data1;
            char *file = (char *)event.user.data2;
              
            

                //End
                int pid;
                
                syslog(LOG_WARNING, "****** CAME TO THIS POINT\n");
                syslog(LOG_WARNING, "****** %s\n", url);
                syslog(LOG_WARNING, "****** %s\n", file);
                char * bob[] = {"/usr/bin/curl", "--upload-file", file, url};
                //char * bob[] = {"/usr/bin/curl", "http://mason.gmu.edu/~mkunz2/me.jpg", "--O", "/media/internal/me4.jpg"};
                if ((pid = fork()) == 0) {
                    execve("/usr/bin/curl", bob, NULL);
                } else {
                    int status;
                    waitpid(pid, &status, 0);
                    char * test = file;
                    syslog(LOG_WARNING, "****** Still Banging in Here\n");
                    PDL_CallJS("getUploadResult", (const char **)&test, 1);
                }

            /* free memory since this event is processed now*/
            free(url);
            free(file);

        }
        
         if (event.type = SDL_USEREVENT && event.user.code == 4) {
              syslog(LOG_WARNING, "*** processing create DIR event event");
              char * dirName = (char*) event.user.data1;
              
              int status = mkdir(dirName, 755);
              if(status == 0){
                  syslog(LOG_WARNING, "*** BEFORE LOOP");
                  PDL_CallJS("getRemoveResult", (const char **)&dirName, 1);
              }
              else{
                  syslog(LOG_WARNING, "*** FAILs LOOP");
                  char * fail = "FAIL";
                  PDL_CallJS("getRemoveResult", (const char **)&fail, 1);
              }
         }
        
        
        if (event.type == SDL_USEREVENT && event.user.code == 5) {
            syslog(LOG_WARNING, "*** processing uploadFile event");
            /* extract our arguments */
            char *url = (char *)event.user.data1;
            char *file = (char *)event.user.data2;
              
            

                //End
                int pid;
                
                syslog(LOG_WARNING, "****** CAME TO THIS POINT\n");
                syslog(LOG_WARNING, "****** %s\n", url);
                syslog(LOG_WARNING, "****** %s\n", file);
                char * bob[] = {"/usr/bin/curl", "--upload-file", file, url};
                //char * bob[] = {"/usr/bin/curl", "http://mason.gmu.edu/~mkunz2/me.jpg", "--O", "/media/internal/me4.jpg"};
                if ((pid = fork()) == 0) {
                    execve("/usr/bin/curl", bob, NULL);
                } else {
                    int status;
                    waitpid(pid, &status, 0);
                    char * test = file;
                    syslog(LOG_WARNING, "****** Still Banging in Here\n");
                    PDL_CallJS("getUploadResult", (const char **)&test, 1);
                }

            /* free memory since this event is processed now*/
            free(url);
            free(file);
        }
        
        


            
    } while (event.type != SDL_QUIT);
    // We exit anytime we get a request to quit the app

    // Cleanup
    PDL_Quit();
    SDL_Quit();

    return 0;
}
