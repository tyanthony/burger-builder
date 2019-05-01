import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utils';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fasfest'},
            {value: 'fast', displayValue: 'Fast'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
  }

  inputChangeHandler = (event, id) => {
    const updatedElement = updateObject(this.state.orderForm[id], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.orderForm[id].validation),
      touched: true
    });
    const updatedForm = updateObject(this.state.orderForm, {
      [id]: updatedElement
    });

    let formIsValid = true;
    for (let id in updatedForm) {
      formIsValid = updatedForm[id].valid && formIsValid;
    }

    this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
  }

  render() {
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map(el => {
          return (
            <Input 
              elementType={el.config.elementType} 
              elementConfig={el.config.elementConfig} 
              value={el.config.value}
              key={el.id}
              changed={(event) => this.inputChangeHandler(event, el.id)}
              invalid={!el.config.valid}
              shouldValidate={el.config.validation}
              touched={el.config.touched}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter you contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (data, token) => dispatch(actions.purchaseBurger(data, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));