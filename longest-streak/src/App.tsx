import React, { useState } from 'react';
import { Grid, Paper, TextField, Typography, styled } from '@mui/material';
import './App.css';

interface StreakData {
  streak: number;
  highlighted: [String],
  caboose: [String],
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '100%',
  display: 'flex',
  flexDirection: 'row'
}));

function App() {
  const url = 'http://localhost:3005/';
  const [showStringHighlights, setshowStringHighlights] = useState<Boolean>(false); 
  const [streakData, setStreakData] = useState<StreakData>({
    streak: 0,
    highlighted: [''],
    caboose: ['']
  });

  const { streak, caboose, highlighted } = streakData;
  const opacity: number = showStringHighlights ? 0 : 1
  const computeStreak = async (val:string) => {
    val.length === 0 ? setshowStringHighlights(false) : setshowStringHighlights(true);
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({inputVal: val}),
    });
    response.json().then(resp => setStreakData({...resp}));
  };

  return (
    <Paper
      elevation={3}
      sx={{ width: 300, height: 200, margin: '0 auto', top: 80, bottom: 0, left: 0, right: 0, position: 'absolute', padding: 10 }}
    >
      <Grid 
        container 
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
          {showStringHighlights && <Item>
            <Typography noWrap>{caboose}</Typography>
            <Typography sx={{background: 'yellow', opacity: .8, borderRadius: 7 }} noWrap>{highlighted}</Typography>
          </Item>}
        </Grid>
        <Typography noWrap >{`Longest Streak ${streak}`}</Typography>
        <TextField
            id="standard-search"
            label="Type Here"
            variant="standard"
            onChange={(e) => computeStreak(e.target.value)}
            sx={{ opacity: opacity }}
          />
      </Grid>
    </Paper>
  );
}

export default App;
