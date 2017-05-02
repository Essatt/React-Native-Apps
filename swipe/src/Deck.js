import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
} from 'react-native';

/*this is a customziable and reusable tinder like swiping component. By changing
the constants one can achieve smaller cards or larger cards all centered on the
screen. The centering fails if large numbers are used in the constants, but
I did not see any point in spending time writing error handlers for it as
this kind of usage means the developer will not be building a tinder like swipe,
and therefore the intended usage is outside this projects scope
*/

//set the global constants
//the screen width of the user's device
const SCREEN_WIDTH = Dimensions.get('window').width;
//what is the threshold during the swipe from which the swipe will be
//automatically completed and animated
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
//how many millisaconds should the swipe movement be completed in
const SWIPE_OUT_DURATION = 250;
//How many more cards do you want to show the user behind the first card
const VISIBLE_CARDS_IN_DECK = 3;
//reduce the card size by the percentage of the screen. 0.1 means it will cover
//90% of the screen
const REDUCTION_PERCENTAGE = 0.1;
//the offset of each card in the Y-axis from the card on top of it in the deck
const CARD_DISTANCE_Y = 3;
//the offset of each card in the X-axis from the card on top of it in the deck
//for optimal outcomes, use max 10
const CARD_DISTANCE_X = 3;
//the top padding of the deck
const DECK_TOP_PADDING = 20;
//first card starting point
const FIRST_CARD_POSITION =
      (((SCREEN_WIDTH * REDUCTION_PERCENTAGE)
        + ((CARD_DISTANCE_X * VISIBLE_CARDS_IN_DECK) * (1 - REDUCTION_PERCENTAGE)))
          / 2);

class Deck extends Component {
  //this is to make the component reusable. If these functions
  //are not passed, the app does not crash
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  }

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    //create panresponder to get input from gestures
    const panResponder = PanResponder.create({
      //3 lifecycle methods of panresponder. First one is to see if this
      //component handles the gestures
      onStartShouldSetPanResponder: () => true,
      //this method is run whenever the component is moved one pixel
      onPanResponderMove: (event, gesture) => {
        //we save the changes to the position variable
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      //this function runs whenever the user stops touching the screen
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });
    //the convention is to add these to state
    //index is to make sure only the top component is swipable
    this.state = { panResponder, position, index: 0 };
  }

  //reset the index in state, if there is a new dataset to be loaded
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    //android helper
    UIManager.setLayoutAnimationEnabledExperimental
      && UIManager.setLayoutAnimationEnabledExperimental(true);

    //Animate the card stack moving up
    LayoutAnimation.spring();
  }

  //helper method that run after a swipe is completed
  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    //call the relevant function to implement app logic
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

    //after the swipe initialize the position values so that the next
    //card is visible on the screen
    this.state.position.setValue({ x: 0, y: 0 });

    //increment the index to move on to the next card and make it swipable
    this.setState({ index: this.state.index + 1 });
  }

  getCardStyle() {
    const { position } = this.state;
    //this function is to determine how much to rotate the card when being
    //swiped interpolating was used to rotate the card proportional to
    //the cards movement on the x-axis. SCREEN_WIDTH constant was used
    //to make sure the card exits the screen fully in any device
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2.0, 0, SCREEN_WIDTH * 2.0],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  //animation to continue the swipe left or right out of the screen
  //on completion of the swipe the call-back method onSwipeComplete is called
  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  //reset the card back into the middle when swipe was not significant enough
  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  deckStyle(i) {
    //this function is to determine how the deck will look. It determines
    //by using the VISIBLE_CARDS_IN_DECK constant, how many cards can be
    //viewed to be in the deck
    let deckStyle = null;
    if (i - this.state.index > VISIBLE_CARDS_IN_DECK) {
      deckStyle = { top: CARD_DISTANCE_Y * VISIBLE_CARDS_IN_DECK,
                    left: FIRST_CARD_POSITION -
                          (CARD_DISTANCE_X * VISIBLE_CARDS_IN_DECK),
                    };
    } else {
      deckStyle = { top: CARD_DISTANCE_Y * (i - this.state.index),
                    left: FIRST_CARD_POSITION -
                            (CARD_DISTANCE_X * (i - this.state.index)),
                     };
    }
    return deckStyle;
  }

  renderCards() {
    //check if there are still cards to render. If not call the renderNoMoreCards
    //method. Other wise continue.
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    //loop through the data and render each card
    return this.props.data.map((item, i) => {
      //if the card has already been swiped, dont render
      if (i < this.state.index) {
        return null;
      }
      //if the card is active/top of the stack, attach the panHandlers
      //this allows the card to react to gestures and be swipable
      if (i === this.state.index) {
        return (
          <Animated.View
            key={item.id}
            style={[this.getCardStyle(), styles.cardStyle, styles.firstCardStyle]}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      //- if the card is not swiped, and also not active, render it, but dont
      //attach the panhandles. This way it could be visible if needed, but not
      //swipable.
      //- The view needs to have a key as the data is technically
      //in a "list". Compile errors are given if there is no
      //"key" parameter.
      //- To give a sense that there are other card behind the First
      //card, we add an extra style, to cascade down each card according
      //to their position on the list
      return (
        <View
          key={item.id}
          style={[styles.cardStyle, this.deckStyle(i)]}
        >
          {this.props.renderCard(item)}
        </View>
      );
    }).reverse();
  }

  render() {
    //the render method uses Animated View rather than plain "View"
    //tag. The reason for it is that if we use View, the card has to
    //re-render when it becomes the active card, as it has to be
    //an animated view. This results in little glitches.
    //as this animated view is not being animated, performance-wise
    //its not a big problem
    return (
      <Animated.View>
        {this.renderCards()}
      </Animated.View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH * (1 - REDUCTION_PERCENTAGE),
    paddingTop: DECK_TOP_PADDING
  },
  firstCardStyle: {
     //paddingRight: (FIRST_CARD_POSITION -
      //   (CARD_DISTANCE_X * VISIBLE_CARDS_IN_DECK)),
    paddingLeft: FIRST_CARD_POSITION,
    width: (SCREEN_WIDTH * (1 - REDUCTION_PERCENTAGE)) + FIRST_CARD_POSITION
  }
};

export default Deck;
