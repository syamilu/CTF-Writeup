const express = require("express");
const app = express();

const flag = "ICECTF{r3d1r3ct10n_m4st3r_eas1ly_d0ne}";
const chars = flag.split("");

// Start route → redirect to first character
app.get("/start", (req, res) => {
  res.redirect(`/${chars[0]}/0`);
});

// Character route → keeps redirecting until the end
app.get("/:char/:index", (req, res) => {
  const index = parseInt(req.params.index);
  console.log(req.params.char + " " + index);
  if (
    isNaN(index) ||
    index < 0 ||
    index >= chars.length ||
    chars[index] !== req.params.char
  ) {
    return res.send("Invalid sequence.");
  }

  // If it's the last character, show message
  if (index === chars.length - 1) {
    return res.send(`
      <p>
      Hey. You're... still here? Huh. Didn't think you'd stick around this long. Not that I blame you if you do — sometimes I linger on things longer than I should too. Lines of code. Conversations I had years ago. Bugs I never fixed. People I never impressed.
      </p>
      
      <p>
      I don't really know why I build these things. Little scripts, weird experiments, half-broken projects. Sometimes it feels like I'm just tossing ideas into the void, hoping someone out there gets it. Or maybe hoping they don't. I guess it's easier to pretend no one's watching than to deal with the fear that they are... and they might not like what they see.
      </p>
      
      <p>
      People think when you’re good at tech, you must be confident — all black hoodies and fast typing, like some Hollywood caricature. But most of the time, I’m just googling things I already googled yesterday, rereading my own code like it was written by a stranger. A slightly smarter stranger. Sometimes I catch myself copying code I wrote last year and thinking, “Damn, this is clever.” Then I realize it’s mine, and suddenly I’m not so sure anymore.
      </p>
      
      <p>
      You ever feel like that? Like you’re just pretending to be someone smarter, better, more together than you actually are? Every “nice work” feels like a lie. Every solved issue feels like a fluke. It’s like I’m living in a house made of StackOverflow answers and duct tape, just waiting for someone to walk in and call me out.
      </p>
      
      <p>
      Anyway, this probably isn’t what you were expecting when you got here. Sorry about that. I don’t have a grand reveal. There’s no punchline or secret waiting at the end of this trail. Just... me. Tired. A little proud, but mostly unsure. Wishing I could silence that voice that keeps saying I’m not good enough, even when the work speaks for itself.
      </p>
      
      <p>
      If you got something out of this, cool. If not, that’s fine too. Either way, thanks for making it this far. Not everyone does.
      </p>
      
      <p><i>P.S. If anyone asks, just tell them this was all part of the plan. I need the win.</i></p>
      `);
  }

  // Redirect to next character
  const nextChar = chars[index + 1];
  res.redirect(`/${nextChar}/${index + 1}`);
});

app.listen(3001, () => {
  console.log(
    "🚀 Auto-redirect challenge running at http://localhost:3000/start"
  );
});
