
# Geometric Inference Tool

![Main Interface](https://raw.githubusercontent.com/KaartikeyNatrajan/GeometricInferenceTool/screenshots/screenshots/Main.PNG)

Geometric Inference Tool is a web based application which students can use to find solutions to problems in geometry. 
The tools allows users to draw diagrams and create questions by specifying 'given information' and 'unknowns'. The inference engine takes all inputs and uses a set of theorems to calculate the missing information.

### Usage

 - Draw out the target diagram by clicking and dragging the mouse over the blackboard
 - Add labels for all the points
 ![Target Diagram with labels](https://raw.githubusercontent.com/KaartikeyNatrajan/GeometricInferenceTool/screenshots/screenshots/IntersectingLines.PNG)
 - Check for points of intersection and label the points if found
 ![Points of Intersection](https://raw.githubusercontent.com/KaartikeyNatrajan/GeometricInferenceTool/screenshots/screenshots/PointsOfIntersection.PNG)
 - Specify the angle values for the angles which are known
 - Click the 'Unknown' button for the angles which are to be calculated
 ![Specify Angle Values](https://raw.githubusercontent.com/KaartikeyNatrajan/GeometricInferenceTool/screenshots/screenshots/SpecifyAngleValues.PNG)
 - Process and Submit the drawing for evaluation
 ![Final Solution](https://raw.githubusercontent.com/KaartikeyNatrajan/GeometricInferenceTool/screenshots/screenshots/Solution.PNG)

## Setup Instructions
This application requires PHP as well as Python. For PHP, either XAMPP or the in-built PHP server will work.

    git clone https://github.com/KaartikeyNatrajan/GeometricInferenceTool.git
    cd GeometricInferenceTool/
    php -S localhost:8080

open http://localhost:8080/index.html
