import logo from '../../logo.svg';
import React, {Component} from 'react';
import Grid from '../Grid';
import Header from '../Header';
import {withFirebase} from '../Firebase'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(""),
      turn: 1,
      header: "X's turn",
      victory: false,
      authUser: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.takeTurn = this.takeTurn.bind(this);
    this.checkIfVictory = this.checkIfVictory.bind(this);
    this.declareVictory = this.declareVictory.bind(this);
    this.setHeader = this.setHeader.bind(this);

    // console.log("firebase")
    // const doc = this.props.firebase.getFirstName()
    // console.log(doc.data().name)
    // .then((document) => {
    //   console.log(document.data())
    // })

  }

  async componentDidMount(){
    this.fetchData()

    this.authStateListener = this.props.firebase.auth.onAuthStateChanged(
      async (authUser) => {
        if (!authUser) {
          this.setState({authUser: null})
        }
        else{
          console.log(authUser)
          this.setState({authUser: authUser})
        }
      }
    )

    // this.props.firebase.auth.onAuthStateChanged
  }

  async fetchData(){
    //const doc = await this.props.firebase.getFirstName()
    //console.log(doc.data().name)
    this.props.firebase.ageOver50()

    this.snapListener = this.props.firebase.db.collection('users').where('age', '>', 50).onSnapshot((querysnap) => {
      querysnap.docChanges().forEach((change) => {
        if (change.type == 'added'){
          console.log("added: " + change.doc.data())
        }
        else if (change.type == 'modified'){
          console.log('modified: ' + change.doc.data())
        }
        else if (change.type == 'removed'){
          console.log('removed: ' + change.doc.data())
        }
      })
    })
  }

  componentWillUnmount(){
    this.snapListener();
    this.authStateListener();
  }

  takeTurn(turn, i) {
    let str = "";
    let trn;
    if (turn === 1) {
        str = "x";
        trn = 2;
    } else {
        str = "o";
        trn = 1;
    }
    console.log('before if ' + trn)
    if (this.state.squares[i] === "") {
        console.log('before state ' + trn)
        this.setState({turn: trn});
        console.log('after state ' + this.state.turn)
        this.setHeader();
        return str;
    } else {
        return false;
    }
  }

  setHeader() {
    console.log(this.state.turn)
    if (this.state.turn == 1) {
      this.setState({header: "X's turn"});
    } else if (this.state.turn == 2) {
      this.setState({header: "O's turn"});
    }
  }

  checkIfVictory() {
    /*possible combinations:
    1,2,3
    1,5,9
    1,4,7
    2,5,8
    3,6,9
    3,5,7
    4,5,6
    7,8,9
    */
    const combinations = [[0,1,2], [0,4,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]];
    let squares = this.state.squares;
    for (let i = 0; i < combinations.length; i++) {
      const [n1,n2,n3] = combinations[i];
      if (squares[n1] === squares[n2] && squares[n2] ===  squares[n3] && squares[n1] !== "") {
        return squares[n1];
      }
    }
    return null;
    
   
  }

  declareVictory(victor) {
    this.setState({header: victor.toUpperCase() + " won!", victory: true});
    
  }

  handleClick(i) {
    let str = this.takeTurn(this.state.turn, i);
    if (!str) {
      return;
    }
    let update = this.state.squares;
    update[i] = str;

    this.setState({squares: update});
    
    let victory = this.checkIfVictory();
    if (victory) {
      this.declareVictory(victory);
    }
  }

  render() {
    return (
        <div>
          <div>
           

            {
              this.state.authUser ? <div>  <button onClick = {() => this.props.firebase.signOut()} > Sign out </button>
              <Header text={this.state.header}/>
              <p> {this.state.authUser.displayName}</p>
              <Grid handleClick={this.handleClick} squares={this.state.squares} victory={this.state.victory}/> </div> :
               <button onClick = {() => this.props.firebase.signIn()} > Sign in </button>
            }
           
          </div>
        </div>
    );
  }
}

export default withFirebase(App);
