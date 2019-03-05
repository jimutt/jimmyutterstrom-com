---
title: PSoC and FreeSoC2
slug: freesoc2
status: published
publishedDate: '2015-06-30T13:29:44.000Z'
metaDescription: null
metaTitle: null
---

A while back I received a [PSoC4 pioneer kit](http://www.cypress.com/?rid=77780) from one of my university mentors. It’s a low-cost development board from Cypress Semiconductor featuring an ARM microcontroller with some extra features (I’ll mention more about it later). Now I’ve managed to get a [FreeSoC2](https://www.sparkfun.com/products/13229) dev board though, it’s a PSoC based development board sold by Sparkfun is a collaboration between Sparkfun and Cypress. It features a much more powerful (compared to the pioneer board)PSoC5LP ARM Cortex M3 MCU with a lot of fancy features and possibilities including Cypress well known CapSense®. It’s sold at a veryreasonable price of\$49.95 at Sparkfun.

**What is this “PSoC” stuff?**

![](https://di2hdke024x80.cloudfront.net/images/FreeSoC2.jpg)

FreeSoC2. Image from https://www.sparkfun.com/products/13229

Before I venture deeper into the world of PSoC and the FreeSoC2 board I believe that some of you might be wondering what PSoC is and what makes it different from standard Atmel ARM MCUs. Well to make it really simple I would like to compare the PSoC architecture to a machup between an FPGA and a standard CPU. It might not be the best comparison but with PSoC you have the ability to create custom hardware-blocks within the processor as well as you can fully controlthe pin routing etc. I believe that the information on Cypress website is quite good. There you can read:

> The PSoC® architecture consists of configurable analog and digital blocks, a CPU subsystem and programmable routing and interconnect. PSoC lets you plug in predefined and tested IP from the PSoC library of functions, or code your own. Either way, you have the flexibility to build innovation and competitive advantage into your products.
>
> **Programable Routing & Interconnect**  
>  This frees you to re-route signals to userselected pins, shedding the constraints of a fixed-peripheral controller. In addition, global buses allow for signal multiplexing and logic operations, eliminating the need for a complicated digital-logic gate design.  
> **Configurable Analog and Digital Blocks**  
>  The union of configurable analog and digital circuitry is the basis of the PSoC platform. You configure these blocks using pre-built library functions or by creating your own. By combining several digital blocks, you can create 16-, 24-, or even 32-bit wide logic resources. The analog blocks are composed of an assortment of switch capacitor, op-amp, comparator, ADC, DAC, and digital filter blocks, allowing complex analog signal flows. For a partial list of preconfigured functions included in PSoC software, see the sidebars on the next two pages. You can modify and personalize each function to your design.
>
> **CPU Subsystem**  
>  PSoC offers a sophisticated CPU subsystem with SRAM , EE PROM, and flash memory, multiple core options and a variety of essential system resources including:
>
> - Internal main and low-speed oscillator
> - Connectivity to external crystal oscillator for precision, programmable clocking  
>   Sleep and watchdog timers
> - Multiple clock sources that include a PLL
>
> PSoC devices also have dedicated communication interfaces like I2C, Full-Speed USB 2.0, CAN 2.0, and on-chip debugging capabilities using JTAG and Serial Wire Debug. The newest members of the PSoC family offer industry-standard processors like the 8051, ARM Cortex-M3 and ARM Cortex-M0.



I hope you’re still following me and that you by now have begun to understand the basics of the PSoC ecosystem.Because it might be good to now a little about the system later when I’ll begin to write some blog posts and tutorials about working with the FreeSoC2 and perhaps other PSoC dev boards as well.
