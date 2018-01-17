/* document ready */
$(document).ready(function() {
  console.log("app.js loaded!");
  

//show all projects
app.get("/api/projects", function index(req, res) {
res.json({ results: results });        
// What are you going to send back to the client?
});

});
