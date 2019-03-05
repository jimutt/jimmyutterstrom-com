---
title: More PSoC 5LP boards on the way!
slug: more-psoc5-boards-on-the-way
status: published
publishedDate: '2015-07-06T15:28:43.000Z'
metaDescription: null
metaTitle: null
---

I really like my FreeSoC2 board as well as the pioneer. But to be honest the large physical size of the FreeSoc 2 can be a downside sometimes. Right now I am constructing a prototype for an autonomous navigation system which I would like to able to fit in a very small space for being able to try it with different rovers and USV:s. But how do you solve that? Well as I can’t really split the FreeSoC board in half I needed to look for better solutions. Ordering a custom board would be possible but then I would instead need to put a lot of time into designing the hardware and then assembling the SMT components. Though luckily Cypress has designed a product that will hopefully solve this problem for me in a cheap and easy way!

TheCY8CKIT-059 is an **extremely** cheap (**\$10!!!!**) PSoC5 LP development board with a tiny footprint. It measures only 97.5 X 24 mm and can be made even smaller if you snap off the debugger area.

![](https://di2hdke024x80.cloudfront.net/images/CY8CKIT-059.jpg)

Source: http://www.cypress.com/documentation/development-kitsboards/cy8ckit-059-psoc-5lp-prototyping-kit

Even though it’s a tiny board it still featuresa Cortex M3 CY8C5888 MCU as powerful as the one on the FreeSoC2 board as well as a KitProg programmer/debugger which can be detached from the main board. Though due to the limited size available it does not have as many I/O-pins available as the FreeSoC2 board but for most projects it will be more than enough.

I just ordered 3 of the above boards to see how they are to work with. I will write more about it when I’m able to put themto use!
