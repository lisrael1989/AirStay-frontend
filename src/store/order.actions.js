import { orderService } from '../services/order.service.js'
import { store } from './store.js'
import { ADD_ORDER, REMOVE_ORDER, SET_ORDER, SET_ORDERS, UPDATE_ORDER } from './order.reducer.js'
import { SOCKET_EVENT_ORDER_Update, socketService } from '../services/socket.service.js'
// import { SET_SCORE, SET_WATCHED_USER} from './user.reducer.js'

// Action Creators
export function getActionRemoveOrder(orderId) {
  return { type: REMOVE_ORDER, orderId }
}
export function getActionAddOrder(order) {
  return { type: ADD_ORDER, order }
}
export function getActionUpdateOrder(order) {
  return { type: UPDATE_ORDER, order }
}
export function getActionSetWatchedUser(user) {
  return { type: SET_WATCHED_USER, user }
}

export async function loadOrders() {
  try {
    const orders = await orderService.query()
    store.dispatch({ type: SET_ORDERS, orders })

  } catch (err) {
    console.log('orderActions: err in loadOrders', err)
    throw err
  }
}

export async function orderInProgress(orderInProgress) {
  try {
    const savedOrder = await orderService.saveLocalOrder(orderInProgress)
    store.dispatch({ type: SET_ORDER, savedOrder })

  } catch (err) {
    console.log('orderActions: err in orderInProgress', err)
    throw err
  }
}

export async function updateOrder(order) {
  try {
    console.log('try', order)
    const updatedOrder = await orderService.saveOrder(order)
    store.dispatch({ type: UPDATE_ORDER, order: updatedOrder })
    // socketService.emit(SOCKET_EVENT_ORDER_Update, updatedOrder.buyer._id)
    return updatedOrder
  } catch (err) {
    console.log('orderActions: err in addorder', err)
    throw err
  }
}



export async function addOrder(order) {
  try {
    const addedorder = await orderService.saveOrder(order)
    store.dispatch({ type: ADD_ORDER, addedorder })
  } catch (err) {
    console.log('orderActions: err in addorder', err)
    throw err
  }
}
// export async function addOrder(order) {
//   try {
//     const addedorder = await orderService.add(order)
//     store.dispatch(getActionAddOrder(addedorder))
//     const { score } = addedorder.byUser
//     store.dispatch({ type: SET_SCORE, score })
//   } catch (err) {
//     console.log('orderActions: err in addorder', err)
//     throw err
//   }
// }

export async function removeorder(orderId) {
  try {
    await orderService.remove(orderId)
    store.dispatch(getActionRemoveOrder(orderId))
  } catch (err) {
    console.log('orderActions: err in removeorder', err)
    throw err
  }
}