/*
 * stm32_time.cpp
 *
 *  Created on: 30 ���. 2018 �.
 *      Author: Nemo
 */


#include "stm32_time.h"

void stm32_time_init(void)
{

}

// Get the current time in milliseconds
uint32_t stm32_time_now(void)
{
	uint32_t now;

	//EnterCritical();
	//cli();
	//now = overflow_ms;
	//ExitCritical();
	//sei();

	return now;
}
