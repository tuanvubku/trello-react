import React from 'react';
import { connect } from 'react-redux';

import TrelloCard from '@/components/Card';
import AddButton from '@/components/AddButton';
import { Droppable } from 'react-beautiful-dnd';
import Icon from '@material-ui/core/Icon'

@connect(({ card }) => ({
  globalCards: card.cards
}))
class TrelloList extends React.Component {
  state = {
    globalCards: [],
    title: this.props.title,
    isEditing: false
  };

  componentWillReceiveProps(props) {
    this.setState({ globalCards: props.globalCards });
  }


  renderEditInput(){
    const styles = {
      style: {
        width: '100%',
        border: 'none',
        outlineColor: 'blue',
        borderRadius: 3,
        marginBottom: 3,
        padding: 5,
        outline: "none",
        overflow: 'hidden'
      }
    };
    return (
    <form onSubmit={this.handleFinishEditing} >
      <input type="text" style={styles.style} value={this.state.title} onChange={this.handleOnchange} autoFocus onFocus={this.handleFocus} onBlur={this.handleFinishEditing}/>
    </form>
    )
  }


  handleFocus = (e) => {
    e.target.select()
  }

  handleOnchange = e => {
    e.preventDefault();
    this.setState({
      title: e.target.value
    })
  }

  handleFinishEditing = () => {
    const { idList,dispatch } = this.props;
    this.setState({
      isEditing: false
    })
    dispatch({
      type: 'list/editListRequest',
      payload: {
        _id: idList,
        name: this.state.title,
        archived: true
      }
      
    })
  }
  setIsEditing = () => {
    this.setState({
      isEditing: true
    })
  }

  handleDelete = () => {
    const { idList,dispatch } = this.props;
    dispatch({
      type: 'list/deleteListRequest',
      payload: {_id: idList}
    })
  }
  render() {
    const styles = {
      container: {
        backgroundColor: '#ccc',
        borderRadius: 3,
        width: 300,
        padding: 8,
        marginRight: 8,
        height: '100%'
      },
      styleHeader: {
        margin: 5,
        marginBottom: 10,
        outline: "none",
        overflow: 'hidden'
      },
      delete: {
        cursor: 'pointer',
        transition: 'opacity 0.3s ease-in-out',
        opacity: 0.4
      },
      titleContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer'
      }
    };

    const { idList } = this.props;
    const { globalCards } = this.state;
    const cards = globalCards[idList] ? globalCards[idList] : [];
    cards.sort((x, y) => (x.order > y.order ? 1 : -1));
    console.log(cards)
    return (
      <Droppable droppableId={String(idList)}>
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={styles.container}
          >
            {this.state.isEditing ? (this.renderEditInput()) :
              (<div onClick={() => this.setIsEditing()} style={styles.titleContainer}>
              <h4 style={styles.styleHeader}>{this.state.title}</h4>
              <Icon style={styles.delete} onClick={this.handleDelete}>delete</Icon>
            </div>)
            }
            
            
            {cards.map((card, index) => (
              <TrelloCard key={card._id} card={card} index={index} />
            ))}
            <AddButton idList={idList} />
          </div>
        )}
      </Droppable>
    );
  }
}

export default TrelloList;
