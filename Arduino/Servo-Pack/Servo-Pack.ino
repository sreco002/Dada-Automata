
/*touch sensor for The code is a shadow bubble, up to 5 servo motors
  servo operating from Servo.h library
  touch sensor code from CapacitiveSensor.h library
  smoothing the readings from the sensor
  https://www.arduino.cc/en/Tutorial/Smoothing
*/

int pos = 0;   // variable to store the servo position for servoPlayPos()
int delayServo = 5000;
int treshold = 1000;//1000// crochet is 600
const int LED = LED_BUILTIN;


// Define the number of samples to keep track of.  The higher the number,
// the more the readings will be smoothed, but the slower the output will
// respond to the input.  Using a constant rather than a normal variable lets
// use this value to determine the size of the readings array.

const int numReadings = 10;

int readings[numReadings];      // the readings from the analog input
int readIndex = 0;              // the index of the current reading
int total = 0;                  // the running total
int average = 0;                // the average






//



#include <Servo.h>;
#include <CapacitiveSensor.h>;

const int servoCount = 5;
Servo servos[servoCount]; //array of servo from 9 up tp lenght -1
const int motorPin0 = 8;//8 to 12


CapacitiveSensor   cs_4_2 = CapacitiveSensor(4, 2);



void setup() {
  Serial.begin(9600);
  //smoothing the readings for stability
  // initialize all the readings to 0:

  for (int thisReading = 0; thisReading < numReadings; thisReading++) {
    readings[thisReading] = 0;
  }



  for (int s = 0; s < servoCount; s++)
  {
    servosAttach(s);

  }

  pinMode(LED, OUTPUT);
  cs_4_2.set_CS_AutocaL_Millis(0xFFFFFFFF);

}

void loop() {
  // read from the sensor:
  long sensorValue =  cs_4_2.capacitiveSensor(30);


  // subtract the last reading:
  total = total - readings[readIndex];

  // smoothing readings from the sensor:

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
  // send it to the computer as ASCII digits
  // Serial.println(average);
  delay(3);        // delay in between reads for stability



  for (int s = 0; s < servoCount; s++)
  {
    servosAttach(s);

  }


  Serial.println(average);  // print sensor output
  if (average > treshold)
  {
    digitalWrite(LED, HIGH);

    for (int s = 0; s < servoCount; s++)
    { servosAttach(s);
      servoPlayPos(s);

    }

  }



}


//== == == FUNCTIONS


void servoPlayPos(int s) {


  servos[s].write(180);


  for (pos = 180; pos >= 90; pos -= 1) // goes from 180 degrees to 0 degrees
  {

    servos[s].write(pos);

    // tell servo to go to position in variable 'pos'
    delay(10); // waits for the servo to reach the position

  }
  //

  servos[s].write(90);
  servosDetach(s);




}

void servosAttach(int s) {


  servos[s].attach(s + 8);


}

void servosDetach(int s) {

  servos[s].detach();


}




