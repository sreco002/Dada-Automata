/*Using a Transistor to Control High Current Loads with an Arduino
  https://itp.nyu.edu/physcomp/labs/motors-and-transistors/using-a-transistor-to-control-high-current-loads-with-an-arduino/
  motor feed around 2.5V to have very small turn, "joker"
  6 V   310 RPM, 70 mA *5 = 350mA
  touch sensor code from CapacitiveSensor.h library
  smoothing the readings from the sensor
  https://www.arduino.cc/en/Tutorial/Smoothing


*/

#include <CapacitiveSensor.h>;

const int transistorPin1 = 9;    // connected to the base of the transistor
const int transistorPin2 = 12;    // connected to the base of the transistor
const int transistorPin3 = 10;    // connected to the base of the transistor
const int transistorPin4 = 11;    // connected to the base of the transistor
const int transistorPin5 = 8;    // connected to the base of the transistor
int cap_pin_out = 4;
int cap_pin_in = 2;
//const int sensorPin = 9;    // connected to the base of the transistor

//capacitive sensor------
CapacitiveSensor   capSense = CapacitiveSensor(cap_pin_out, cap_pin_in);  // 10M resistor between pins 1 & 2, pin 2 is sensor pin, add a wire and or foil if desired


int treshold = 1000;//activation limit


// Define the number of samples to keep track of.  The higher the number,
// the more the readings will be smoothed, but the slower the output will
// respond to the input.  Using a constant rather than a normal variable lets
// use this value to determine the size of the readings array.
const int numReadings = 10;

int readings[numReadings];      // the readings from the analog input
int readIndex = 0;              // the index of the current reading
int total = 0;                  // the running total
int average = 0;                // the average


void setup() {
  Serial.begin(9600);
  // initialize all the readings to 0:

  for (int thisReading = 0; thisReading < numReadings; thisReading++) {
    readings[thisReading] = 0;
  }

  capSense.set_CS_AutocaL_Millis(0xFFFFFFFF);// turn off autocalibrate on channel 1 - just as an example


}

void loop() {

  // read the sensor
  long sensorValue =   capSense.capacitiveSensor(30);
  // Serial.println(sensorValue);  // print sensor output sensor1

  // subtract the last reading:
  total = total - readings[readIndex];

  // read from the sensor:

  readings[readIndex] = sensorValue;

  // add the reading to the total:
  total = total + readings[readIndex];
  // advance to the next position in the array:
  readIndex = readIndex + 1;

  // if we're at the end of the array...
  if (readIndex >= numReadings) {
    // ...wrap around to the beginning:
    // Serial.println("start again");
    readIndex = 0;
  }

  // calculate the average:
  average = total / numReadings;
  delay(1);        // delay in between reads for stability

  //activate the motors if treshold is passed
  if (average > treshold)  {


    digitalWrite(transistorPin1, HIGH);
    digitalWrite(transistorPin2, HIGH);
    digitalWrite(transistorPin3, HIGH);
    digitalWrite(transistorPin4, HIGH);
    digitalWrite(transistorPin5, HIGH);


  }
  else if (average < treshold)  {
    digitalWrite(transistorPin1, LOW);
    digitalWrite(transistorPin2, LOW);
    digitalWrite(transistorPin3, LOW);
    digitalWrite(transistorPin4, LOW);
    digitalWrite(transistorPin5, LOW);

  }


}

