import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import blue from '@material-ui/core/colors/blue';
import { connect } from 'react-redux';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: 5,
    marginRight: 5,
    width: 300
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: 10
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  grid: {
    width: '60%'
  },
  paper: {
    position: 'absolute',
    zIndex: 10,
    marginTop: 55,
    left: 0,
    right: 0
  },

  inputRoot: {
    flexWrap: 'wrap'
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1
  }
});
var suggestions = []; // global
function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;
  return (
    <TextField
      required
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
      label="Name"
      style={styles.textField}
      variant="outlined"
      name="username"
      fullWidth
    />
  );
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.username) > -1;
  return (
    <List>
      <ListItem
        {...itemProps}
        key={suggestion._id}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        <ListItemAvatar>
          <Avatar src={suggestion.imageUrl} style={styles.avatar}>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={suggestion.username} />
      </ListItem>
    </List>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;
  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.username.slice(0, inputLength).toLowerCase() ===
            inputValue;
        if (keep) {
          count += 1;
        }
        return keep;
      });
}
@connect(({ user, card, board }) => ({
  currentUser: user.user,
  currentCard: card.currentCard,
  allUsername: user.allUsername,
  boardInfo: board.boardInfo
}))
class AutoCompleteTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', allUsername: [] };
  }
  componentWillMount() {
    var { dispatch } = this.props;
    dispatch({
      type: 'user/fetchAllUsername',
      payload: {}
    });
  }
  componentWillReceiveProps(props) {
    this.setState({ allUsername: props.allUsername });
    suggestions = props.allUsername;
  }
  onSave = () => {
    if (!this.state.username) return false;
    var { dispatch, currentUser, currentCard, kind, boardInfo } = this.props; // kind is add mem to board or card
    if (kind === 'card') {
      var body = {
        _id: currentCard._id,
        idUserAdd: currentUser._id,
        newMemberName: this.state.username
      };
      dispatch({
        type: 'card/addMemberRequest',
        payload: { body }
      });
      dispatch({
        type: 'card/toggleSubForm',
        payload: { kind: null, open: false }
      });
    } else if (kind === 'board') {
      dispatch({
        type: 'board/toggleshowFormAddMem', // toggle modal add mem of board
        payload: { value: false }
      });
      dispatch({
        type: 'board/addMemberRequest',
        payload: {
          body: {
            _id: boardInfo._id,
            newMemberName: this.state.username
          }
        }
      });
    }
  };
  render() {
    const { classes } = this.props;
    var { allUsername } = this.state;
    suggestions = allUsername;
    return (
      <div className={classes.root}>
        <form>
          <Downshift
            onInputValueChange={selection =>
              this.setState({ username: selection })
            }
          >
            {({
              getInputProps,
              getItemProps,
              getMenuProps,
              highlightedIndex,
              inputValue,
              isOpen,
              selectedItem
            }) => (
              <div className={classes.container}>
                {renderInput({
                  fullWidth: true,
                  classes,
                  InputProps: getInputProps({
                    placeholder: 'Search a name'
                  })
                })}
                <div {...getMenuProps()}>
                  {isOpen ? (
                    <Paper className={classes.paper} square>
                      {getSuggestions(inputValue).map((suggestion, index) =>
                        renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({
                            item: suggestion.username
                          }),
                          highlightedIndex,
                          selectedItem
                        })
                      )}
                    </Paper>
                  ) : null}
                </div>
              </div>
            )}
          </Downshift>
          <ListItem button onClick={this.onSave}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Thêm" />
          </ListItem>
        </form>
      </div>
    );
  }
}
export default withStyles(styles)(AutoCompleteTextField);
