import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }
  sideDrawerTogglerHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !this.state.showSideDrawer };
    });
  }

  render() {
    return (
      <Aux>
        <Toolbar 
          drawerToggleClicked={this.sideDrawerTogglerHandler} 
          isAuth={this.props.isAuthenticated}  
        />
        <SideDrawer 
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
    
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);