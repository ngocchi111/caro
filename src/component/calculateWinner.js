function calculateWinner(squares, step, r, c, lwin) {
    for (let i=0;i< r;i++){
      for (let j=0;j< c;j++){
        if (squares[i*c+j]){
          let t = null;
          let line = [i*c+j];
          for (let u=1;u<lwin;u++){
            if ((u+j)%c === 0  || squares[u+j+i*c] != squares[i*c+j])
              t=true;
            line.push(i*c+u+j);
          }
          if (t === null) return { winner: squares[i*c+j], line: line}
          t=null;
          line = [i*c+j];
          for (let u=1;u<lwin;u++){
            if (u+i>r || squares[u*c+j+i*c] != squares[i*c+j])
              t=true;
              line.push(i*c+j+u*c);
          }
          if (t===null) return {winner: squares[i*c+j], line: line}
          t=null;
          line = [i*c+j];
          for (let u=1;u<lwin;u++){
            if (u+i>r || (u+c*u+j+i*c)%c === 0 || squares[u+j+i*c+c*u] != squares[i*c+j])
              t=true;
              line.push(u+c*u+j+i*c);
          }
          if (t===null) return {winner: squares[i*c+j], line: line}
          t=null;
          line = [i*c+j];
          for (let u=1;u<lwin;u++){
            if (u+i>r || (1-u+j+i*c)%c === 0 || squares[-u+j+i*c+c*u] != squares[i*c+j])
              t=true;
              line.push(i*c+j-u+u*c);
          }
          if (t===null) return {winner: squares[i*c+j], line: line}
        }
      }
    }   
    if (step == c*r) 
        return {
            winner: "D",
            line: null
        }
    return {winner: null, line: null};
  }

  export default calculateWinner;