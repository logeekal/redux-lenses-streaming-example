# Changes Implemented


## Part 1 Login And Subscribing

1. Initially SQL Subscribe text section was always visible, now it is visible conditionally

2. login and token update

3. using redux thunk  for login and subscriptn

4. Issue with subscription
  - data model not consistent
  - the MessageList interpretation fof data was written according the v4.3 documentation but docker was returning a different model. Infact model of all the topics is different to each other. So did data evaluation in MessageList according to `cc_payments` output.

## Part 2 Unsubscribtion and Conversiong of Message List to functional component
