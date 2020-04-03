import { Container, Grid, Paper } from "@material-ui/core";
import * as React from "react";
import { Ref, useRef } from "react";

import { Answer } from "./Answer";
import { Judge } from "./Judge";
import { NextQuestion } from "./NextQuestion";
import { PreviousQuestion } from "./PreviousQuestion";
import { Question } from "./Question";
import { ScoreBar } from "./ScoreBar";
import { Speaker } from "./Speaker";

export function App() {
  const refocusEl: Ref<HTMLInputElement> = useRef(null);
  const refocus = () => {
    refocusEl.current?.focus();
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "1em" }}>
        <Grid container>
          <Grid item xs={1}>
            <PreviousQuestion refocus={refocus} />
          </Grid>
          <Grid item xs={3}>
            <Question />
          </Grid>

          <Grid item xs={7}>
            <Answer refocusEl={refocusEl} />

            <Speaker refocus={refocus} />

            <div style={{ marginTop: "1em" }}>
              <Judge />
            </div>

            <div style={{ marginTop: "1em" }}>
              <ScoreBar />
            </div>
          </Grid>

          <Grid item xs={1}>
            <NextQuestion refocus={refocus} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}