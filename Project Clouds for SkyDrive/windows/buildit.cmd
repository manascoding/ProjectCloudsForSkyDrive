@echo off

@rem if run in the windows script folder, change to parent
if not exist plugin ( pushd .. ) else pushd .

@rem Set the device you want to build for to 1
set PRE=0
set PIXI=0
set EMULATOR=0
set DEBUG=1

@rem List your source files here
set SRC=plugin\Download.cpp

@rem List the libraries needed
set LIBS=-lSDL -lpdl

@rem Name your output executable
set OUTFILE=download_plugin

if x%1==xpre ( 
   set PRE=1 
) else if x%1==xpixi ( 
   set PIXI=1
) else if x%1==xemulator ( 
   set EMULATOR=1
) else set PIXI=1

if %PRE% equ 0 if %PIXI% equ 0 if %EMULATOR% equ 0 goto :END

if %DEBUG% equ 1 (
   set DEVICEOPTS=-g
) else (
   set DEVICEOPTS=
)

if %DEBUG% equ 1 (
   set DEVICEOPTS=-g
) else (
   set DEVICEOPTS=
)

set CC=arm-none-linux-gnueabi-gcc
set LIBPATH="-L%PALMPDK%\device\lib"

if %EMULATOR% equ 1 (
   set CC=i686-pc-linux-gnu-gcc
   set LIBPATH="-L%PALMPDK%\emulator\lib"
)

if %PRE% equ 1 (
   set DEVICEOPTS=%DEVICEOPTS% -mcpu=cortex-a8 -mfpu=neon -mfloat-abi=softfp
)

if %PIXI% equ 1 (
   set DEVICEOPTS=%DEVICEOPTS% -mcpu=arm1136jf-s -mfpu=vfp -mfloat-abi=softfp
)

echo %DEVICEOPTS%

%CC% %DEVICEOPTS% -o %OUTFILE% %SRC% "-I%PALMPDK%\include" "-I%PALMPDK%\include\SDL" %LIBPATH% -Wl,--allow-shlib-undefined %LIBS% -s

popd
goto :EOF

:END
echo Please select the target device by editing the PRE/PIXI variable in this file.
popd
exit /b 1

