CADEX Web-developer (3D visualization and Frontend) assignment for probationers
Задание нацелено на оценку уровня владения необходимым стеком технологий и
способности разобраться в новом материале при необходимости.
Задание составлено на английском языке, т.к. большая часть технической
информации в будущем будет доступна именно на нем.
Пожалуйста, внимательно прочтите все обязательные требования! Вы также
можете выполнить дополнительные задания (под «звездочкой»), это может стать
Вашим преимуществом перед другими кандидатами.
Ответ следует направить на электронную почту в виде ссылок на работающий
веб-сайт с реализованным функционалом и проект на github.

---

Create a 1 page web-application with simple UI and interactive 3D viewer that can
display a few geometric primitives (boxes and pyramids). Possible design is
demonstrated above. Web-application should satisfy the following functionality:

1. User should be able to add a group of the specified primitive type, parameters
   and number. For example, '+' button that opens a popup menu where user can
   specify type of the primitive (box or pyramid), primitives parameters (length,
   width, height) and number of displayed primitives.
2. Once user accept to add specified primitive:
   a. Specified primitives should be displayed in the viewer in random places
   and with random colors. Number and size of primitives should be from
   user input in point 1.
   b. List of all displayed primitives should appear in UI with specified position
   in viewer and marked with assigned color from point 2.a.
3. User should be able to select an element from the list in UI. Once the element is
   selected, an appropriate primitive in the viewer should be also visually selected,
   e.g. change color for specified (from code) one. Selecting another element
   should reset selection of already selected primitive in viewer, i.e. reset it state
   before selection.
4. Adding a new group should add primitives both to list in UI and on scene.
5. Have possibility to clear the scene and UI list.
   (\*) Additional optional requirements:
6. When adding new primitives group, each primitive side (i.e. each side of box or
   pyramid) should have the random color.
7. Have possibility to select primitive from the viewer, i.e. clicking on the object in
   viewer should accept selection both to the viewer and UI list.
   Requirements to the implementation:
8. Everything should be written in Typescript.
9. The frontend should be written using React or Angular and Three.js (it's okay to
   use wrappers such as react-three-fiber)
10. UI components should be built using components from a third-party component
    library (Ant Design, Material UI, React Aria, etc.) and customized using CSS.
11. Each primitive should be represented as a single mesh and created using
    BufferGeometry.
