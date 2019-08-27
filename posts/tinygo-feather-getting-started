---
title: How to write Go code and make it run on Adafruit Feather or Arduino
status: published
date: '2019-08-27T12:02:00.000Z'
slug: tinygo-adafruit-feather-getting-started
metaDescription: Getting started with TinyGo - a Go compiler for microcontrollers.
metaTitle: How to write Go code and make it run on Adafruit Feather or Arduino
---

Did you know that you can use Go for embedded systems (like the Arduino Uno or Adafruit Feather)? [TinyGo](https://tinygo.org/) is a light-weight Go compiler specifically created for that purpose. Though the project is still very young, so there are quirks and missing functionality that hasn't been implemented yet.

TinyGo supports a subset of the Go programming language, for a more detailed description please refer to [this page](https://tinygo.org/lang-support/). Still, many parts of the language are already supported, and for example Goroutines seems to be working reasonably well. [The documentation](https://tinygo.org/) is still not very extensive and the AVR compilation (for use with for example Arduino Uno) seems to be quite experimental at the time of writing. Therefore I will be using an [Adafruit Feather M0](https://www.adafruit.com/product/2772) board with an ARM MCU for this post.  

This guide will tell you how to setup your computer for TinyGo development and how to flash a simple blinking LED program to the board. The instructions have been tested on an **Adafruit Feather M0** board, but should also work for these two boards (if the compilation `target` is changed to the corresponding board):
- Adafruit ItsyBitsy M0 (`build -target=itsybitsy-m0`)
- Adafruit Trinket M0 (`build -target=trinket-m0`)

We will be using the UF2 bootloader which makes the Feather appear as a USB drive when in bootloader mode; allowing easy copy-paste of the compiled binary. The Feather will then restart and load the program. 

### Prerequisites
- Very basic Go knowledge
- Knowing how to use the Arduino IDE together with a Feather Board (to install the UF2 bootloader)
- A compatible dev board

## TinyGo Installation

### Linux

Download and install TinyGo:
```
$ wget https://github.com/tinygo-org/tinygo/releases/download/v0.7.1/tinygo_0.7.1_amd64.deb

$ sudo apt-get install ./tinygo_0.7.1_amd64.deb
```

Add TinyGo to `PATH` (log out and in again for the changes to be applied): Open `~/.profile` in your editor of choice and add the below line to the end of  the file:
```
export PATH=$PATH:/usr/local/tinygo/bin
``` 

### Windows
If you've enabled [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) (WSL) you should be able to follow the Linux instructions above. Otherwise I recommend looking at the Docker image provided by the TinyGo team: https://tinygo.org/getting-started/using-docker/

### macOS
I'm unfortunately not a Mac user so I won't be able to provide any help here, but installation on macOS is of course covered by the official docs: https://tinygo.org/getting-started/macos/

## Configure UF2 bootloader
The UF2 bootloader removes the need of installing separate tooling for flashing (the BOSSA cli in this case). Instead, flashing is done through dropping a file onto a removable drive. 

### 1. Enter Bootloader mode
* Connect the Feather M0 board to the computer. 
* Double-press the reset button quickly - the board should now go into Bootloader mode, and the red built-in #13 LED should start fade in and out. 

Now check if your computer has detected a new USB drive (should be present in `/media/{your_user}/` on Linux). If that's the case, you're already ready to go (pun intended) and can skip the next part! If not, you need to install the UF2 Bootloader first.

### 2. Install Bootloader if necessary
Using the standard Arduino IDE, flash the correct UF2 Bootloader to your board. Please refer to the official Adafruit documentation for this step: https://learn.adafruit.com/installing-circuitpython-on-samd21-boards/installing-the-uf2-bootloader

*If you're feeling too lazy to read the documentation: on the Feather M0 board you need to download [this sketch file](https://github.com/adafruit/uf2-samdx1/releases/download/v3.7.0/update-bootloader-feather_m0-v3.7.0.ino) and upload it to the board through the Arduino IDE)*

**IMPORTANT! Make sure you download the correct bootloader file for your board, or you will risk bricking it.**

## Build and flash/upload a simple program
The classic "blink an LED" example for microcontrollers may be overused and not very fancy. As this post's primary purpose is bringing attention to TinyGo and showing how to get started, you will have to wait until later for more interesting use cases though. 

### 1. Create directory and an empty Go file
Create a new directory called "feather-blink". Navigate to the directory and create an empty `feather-blink.go` file. 

### 2. Make the LED blink
Add the following skeleton to the feather-blink.go file:

```go
package main

import (
     "machine"
     "time"
)

func main() {
}
```

The "machine" import, which will be automatically resolved when compiling, allows access to the hardware. The available APIs in the `machine` package differ depending on the board used. To know exactly which types, constants, and methods that are available, you can look at the source code in the [TinyGo repository](https://github.com/tinygo-org/tinygo/tree/master/src/machine). I suppose this type of information will most likely be included in written documentation later on.

* Generic [machine.go](https://github.com/tinygo-org/tinygo/blob/master/src/machine/machine.go) with definition and methods for the "Pin" type
* [board_feather-m0.go](https://github.com/tinygo-org/tinygo/blob/master/src/machine/board_feather-m0.go) - Contains board-specific constants for PIN bindings, UART, SPI etc.  

To make the on-board LED blink we can access it through the `machine.LED` constant (`LED = D13`) which has already been declared for us. We then configure it as an output. In the main loop, we use the `Sleep` function from the `time` package to add a delay before toggling the pin.


```go
package main

import (
     "machine"
     "time"
)

func main() {
     led := machine.LED
     led.Configure(machine.PinConfig{Mode: machine.PinOutput})
     
     for {
          led.Low()
          time.Sleep(time.Millisecond * 1000)
          led.High()
          time.Sleep(time.Millisecond * 1000)
     }
}
```

That's it! Now we just need to build the program and flash it to the board.

### 3. Build program and flash it onto the Feather 

1. Connect the Feather board to the computer and touble-click the reset button to put it in bootloader mode. 
2. Check the path for the new USB drive (on Linux it's most likely `/media/{your username}/FEATHERBOOT`)
3. Build the program and point the output to the Feather device
```
$ tinygo build -target=feather-m0 -o=/media/{your_user}/FEATHERBOOT/flash.uf2 feather-blink.go
```

If the build is successful, the Feather should now automatically restart and run the the program. You should be able to verify it by checking that the LED is blinking, as specified in the code, instead of fading in and out as it did in the bootloader mode. 

If you want to flash a new version to the board you need to first put it into the bootloader mode again. 

## Resources and further reading
* [TinyGo Website](https://tinygo.org/)
* TinyGo has its own channel in the Gophers slack. Get your invite here: https://invite.slack.golangbridge.org/
* Buy a Feather M0 board: https://www.adafruit.com/product/2772 (it's available in different versions, there's for example one with an Micro SD card slot as well)
* If you're new to Go you might want to checkout this interactive walkthrough: https://tour.golang.org
