var piano_js = function()
{
  //===================================VARIABLES=================================================
  //=============================================================================================
  var canvas;
  var renderer;
  var ctx;
  var stave;
  var notes = new Array();
  var audio;
  //===================================INITIALIZE================================================
  //=============================================================================================


  //===================================INTERNAL METHODS==========================================
  //=============================================================================================
  //---------------------------------------------------------------------------------------------

  //draw a stave
  var drawStave = function()
  {
    canvas = document.getElementById("canvas");
    renderer = new Vex.Flow.Renderer(canvas,Vex.Flow.Renderer.Backends.CANVAS);
    ctx = renderer.getContext();
    stave = new Vex.Flow.Stave(50,0,210);
    stave.addClef("treble").setContext(ctx).draw();
  };

  //---------------------------------------------------------------------------------------------
  //Clear stave.
  var clearStave = function()
  {
    notes = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  //---------------------------------------------------------------------------------------------
  //draw a note
  var drawNote = function(note, octave, isSharp)
  {
      if (isSharp == true)
      {
        notes.push(new Vex.Flow.StaveNote({ keys: [note[0]+"#/" + octave], duration: "q" }).
        addAccidental(0, new Vex.Flow.Accidental("#")));
      }
      else if (octave == 5)
        notes.push(new Vex.Flow.StaveNote({ keys: [note[0]+"/" + octave], duration: "q" }));
      else
        notes.push(new Vex.Flow.StaveNote({ keys: [note+"/" + octave], duration: "q" }));

      //clear the canvas and re-drawing.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStave();

      // Helper function to justify and draw a 4/4 voice
      Vex.Flow.Formatter.FormatAndDraw(ctx, stave, notes);

  };

  //play the given note.
  var playNote = function(note)
  {
    audio = new Audio('notes/' +note+ '.wav');
    audio.play();
  };

  //---------------------------------------------------------------------------------------------
  //piano click listener. the method get the note's name and boolean flag of sharp note(color), draw flag
  //if we want to draw the note and play flag if we want to play the note.
var pianoListener = function(color,note,play, draw)
{
  var octave = 4,is_sharp = false;
  if(note.length>1 && (note[0] == note[1])) //check either the note is the first or the second octave.
    octave = 5;

    if(color == "black")
      is_sharp = true;

      if(play)
        playNote(note);

    if(draw) //draw if the flag alowws it.
      drawNote(note, octave, is_sharp);
};


  //===================================EXTERNAL METHODS==========================================
  //=============================================================================================
  //---------------------------------------------------------------------------------------------

return {
  pianoListener : pianoListener,
  drawStave : drawStave,
  clearStave : clearStave};

}();
