/*
 * STM32Hardware.h
 *
 *  Created on: 29 ���. 2018 �.
 *      Author: Nemo
 */

#ifndef STM32F4HARDWARE_H_
#define STM32F4HARDWARE_H_

#include "stm32f4xx.h"
#include "stm32_time.h"
#include "stm32_uart.h"


//extern "C"
//{
//	#include "stm32f4xx.h"
//
//  //#include <avr/interrupt.h>
//  //#include <avr/wdt.h>
//  //#include "avr_time.h"
//  //#include "avr_uart.h"
//}


class STM32F4Hardware
{
public:
	STM32F4Hardware();

	// Initialize the STM32
	void init();

	//
	int read();

	// Send a byte of data to ROS connection
	void write(uint8_t* data, int length);

	// Returns milliseconds since start of program
	unsigned long time();

};

#endif /* STM32F4HARDWARE_H_ */