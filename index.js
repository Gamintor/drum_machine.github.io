const sounds = [
  {id:'Bass drum', letter:'Q', src:'https://dight310.byu.edu/media/audio/FreeLoops.com/3/3/Free%20Kick%20Sample%2011-909-Free-Loops.com.mp3'},
  {id:'Snare', letter:'W', src:'https://dight310.byu.edu/media/audio/FreeLoops.com/1/1/Alchemist%20Snare%201-1830-Free-Loops.com.mp3'},
  {id:'Closed hi-hat', letter:'E', src:'https://www.randomthink.net/labs/html5drums/drumkit/Hi%20Hat%20Closed.mp3'},
  {id:'Opened hi-hat', letter:'A', src:'https://dight310.byu.edu/media/audio/FreeLoops.com/2/2/Dirty%20South%20Hihat%2003-3621-Free-Loops.com.mp3'},
  {id:'Crash', letter:'S', src:'https://dight310.byu.edu/media/audio/FreeLoops.com/1/1/909%20Crash%2002-5823-Free-Loops.com.mp3'},
  {id:'Ride', letter:'D', src:'https://dight310.byu.edu/media/audio/FreeLoops.com/1/1/909%20Ride%2001-5844-Free-Loops.com.mp3'},
  {id:'Cowbell', letter:'Y', src:'https://www.randomthink.net/labs/html5drums/drumkit/Cow%20Bell.mp3'},
  {id:'Rack tom', letter:'X', src:'https://dight310.byu.edu/media/audio/FreeLoops.com/1/1/909%20Mid%20Tom.wav-21921-Free-Loops.com.mp3'}, 
  {id:'Floor tom', letter:'C', src:'https://dight310.byu.edu/media/audio/FreeLoops.com/5/5/Ludwig%20Mid%20Tom-8115-Free-Loops.com.mp3'}
];


const App = () => {
  const [volume, setVolume] = React.useState(50);
  
  return <div id='display' className='display'>
      <h1>Drum Machine 2000</h1>
      <h2>Press a button</h2>
      <div id='input'>
        <i className="fas fa-volume-down"></i>
        <input type="range" value={volume} min="1" max="100" step="1" id="volume" onChange={e => setVolume(e.target.value) }></input>
        <i className="fas fa-volume-up"></i>
      </div>
      {sounds.map((sound, i) => (
         <DrumPad text={sound.letter} key={i} audio={sound.src} volume={volume}/>
       ))}
   </div>
};
  


class DrumPad extends React.Component  {
  constructor(props) {
    super(props);
    this.audio = React.createRef();
  }
  componentDidMount() {
    window.focus();
    this.audio.current.addEventListener('ended', (e) => {
      const parent = e.target.parentNode;
      parent.classList.remove('active')
    })
  }
  
  playSound = () => {
    this.audio.current.volume = this.props.volume / 100;
    this.audio.current.play();
    const parent = this.audio.current.parentNode;
    parent.classList.add('active')
    const id = this.audio.current.id;
    const {id: name} = sounds.find(sound => sound.letter === id)
    const display = parent.parentNode;
    display.querySelector('h2').innerText = name;
  }
    
  render() {
    const {text, audio} = this.props;
    
    return(
      <div className='drum-pad' onClick={this.playSound} id={`drum-${text}`}>
        {text}
        <audio src={audio} className='clip' ref={this.audio} id={text} />
      </div>
    )
  }
}

document.addEventListener('keydown', e => {
  const id = e.key.toUpperCase();
  const audio = document.getElementById(id);
  if(audio) {
    audio.currentTime = 0;
    const parent = audio.parentNode;
    parent.classList.add('active')
    const display = parent.parentNode;
    const {id: name} = sounds.find(sound => sound.letter === id)
    display.querySelector('h2').innerText = name;
    const volume = document.getElementById('volume').value;
    audio.volume = volume / 100;
    audio.play();
  }
});

ReactDOM.render(<App />, document.getElementById('drum-machine'));


