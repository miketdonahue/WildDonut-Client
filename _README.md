#Miyagi

##The Skillsharing Community Platform

## Team

  - __Product Owner__: Mike Donahue
  - __Scrum Master__: Artur Meyster
  - __Development Team Members__: Ryan J. Atkinson, Kyle Owen

Miyagi is a mobile application which organizes communities of teachers and students.
The best way to learn to surf is not by watching online tutorials,
it's by going out in the ocean with an expert surfer and getting hands on experience.
Miyagi makes interactions like these simple to create. Miyagi allows teachers
to advertise in person classes, and students to sign up and pay for those classes.

##User Story

#####Sign In
 1. The user signs into Miyagi using Facebook or a username and password.
 1. The user may proceed through the application as both a student and a teacher.

#####Student mode

  1. The student browses the class list, and finds classes he enjoys.
  1. The student signs up and pays for the classes he is interested in.
  1. The student keeps track of his upcoming classes by looking at his schedule.
  1. Once each class has finished, the student may sign in to rate the class.

#####Teacher mode
  1. The teacher creates classes, sets prices, and uploads class photos.
  1. The teacher sees in his schedule that students have signed up
    for his classes.
  1. Once the class has finished, the teacher may withdraw the money
    from his Miyagi account and have it deposited into his bank account.
  1. The teacher may see his reviews in order to recieve feedback.

###BackEnd
- *Server Environment* **NodeJS**
- *Web Framework* **ExpressJS**
- *Database* **MongoDB**
- *Authentication* **PassportJS**
- *Payments* **Stripe**
- *Image Storage* **Amazon S3**
- *Task Runner* **Gulp**

###FrontEnd
- *Mobile Architecture* **AngularJS**
- *User Interface* **Ionic/Cordova**
- *Authentication* **Facebook Javascript SDK**
- *Payments* **Stripe**

###Testing
- *Test Runner* **Gulp**
- *Test Framework* **Mocha**
- *Assertion Library* **Chai**
- *Assertion Library* **Karma**
- *Plugin(s)* **Sinon**

## Contributing

Want to file a bug, contribute some code, or improve documentation?
Excellent! See [_CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
