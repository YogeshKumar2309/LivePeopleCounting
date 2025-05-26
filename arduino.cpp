#define PIR_SENSOR1 2      // Entry Sensor
#define PIR_SENSOR2 3      // Exit Sensor

#define LED_ENTRY 10       // LED for Entry
#define LED_EXIT 11        // LED for Exit

int peopleCount = 0;
unsigned long triggerDelay = 2500; // 2.5 seconds

void setup() {
  pinMode(PIR_SENSOR1, INPUT);
  pinMode(PIR_SENSOR2, INPUT);

  pinMode(LED_ENTRY, OUTPUT);
  pinMode(LED_EXIT, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  int sensor1 = digitalRead(PIR_SENSOR1);
  int sensor2 = digitalRead(PIR_SENSOR2);

  // Entry Detection
  if (sensor1 == HIGH) {
    unsigned long startTime = millis();
    while (millis() - startTime < triggerDelay) {
      if (digitalRead(PIR_SENSOR2) == HIGH) {
        peopleCount++;
        Serial.println(peopleCount); // Only send count

        digitalWrite(LED_ENTRY, HIGH);
        delay(1000);
        digitalWrite(LED_ENTRY, LOW);
        break;
      }
    }
    delay(500); // prevent double trigger
  }

  // Exit Detection
  if (sensor2 == HIGH) {
    unsigned long startTime = millis();
    while (millis() - startTime < triggerDelay) {
      if (digitalRead(PIR_SENSOR1) == HIGH) {
        if (peopleCount > 0) peopleCount--;
        Serial.println(peopleCount); //Only send count

        digitalWrite(LED_EXIT, HIGH);
        delay(1000);
        digitalWrite(LED_EXIT, LOW);
        break;
      }
    }
    delay(500); // prevent double trigger
  }

  delay(100);
}
