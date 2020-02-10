# VETRO-code-examples
Some basic react (and possibly node, we'll see) code examples. Written in notepad so probably not super well linted.

## REACT:
ExampleStructureComponent.jsx - stateless structural component
SelectedUserContextManager.jsx - Stateful context manager

These code examples come with the acknowledgement that all teams have their own preferences for documentation, style,
naming conventions, and structure / design. I have developed my personal style of react composition through a number
of project iterations, learning from confusing and difficult to decypher component heierarchies. While the patterns
within are nuanced and debatable, they represent one example of the code I output on a daily basis, and that most
clearly conveys its purpose to the members of my current team.

My personal philosophy is that code should be self-documenting. Comments are appropriate to highlight gotcha's and
explain complex pieces of logic but otherwise well written code should be easy to read and understand.

## Node.JS
UserController.js - Controller for an express / node user endpoint.

APIs can be extraordinarily layered in their design so it can be difficult to implement a reasonable controller without making
some assumptions. For this exercise we assume we have a few pieces of middleware - one for authorizing and authenticating the
maker of the API request, and another that handles exceptions thrown from the controller. These two components would have
been built separately and have their own dependencies.
