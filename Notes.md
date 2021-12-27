# Changes Implemented


## Part 1 - Login And Subscribing

### 1. SQL Subscribe section
- Initially SQL Subscribe section was always visible, now it is visible conditionally as per the given requirements.
- Now till the user is not logged in, use will NOT be able to subscribe or enter the sql text.

### 2. login and token update
- User can now login by entering the credentials.
- Default host is changed to localhost:3030 i.e the docker host. We can change it conditionally based on environment.
- Error is displayed in case user has entered wrong credentials or some unknown error has occured.

  *Implementation Strategy*
  - Implementation could have been done in multiple ways. For example, login request could be fired from the `Connect` component itself, and status could be updated by calling the Redux action creators.

  - I went with other strategy where I isolated the login functionality to an async action creator called `doLogin` as a part of Action Creators itself. Because of this `doLogin can easily be reused` and `how we call redux actions` is not unchanged as well. It uses Redux-thunk to fire the async action and dispatches necessary actions.
  
  *Possible improvements*
  - I would have changed the login to an actual form (`<form />`) so that it is more `accessible` and it can `take advantage of form validations and mandatory fields` 

### 3. Subcribing to an SQL
- As soon as user enters the SQL and clicks on `Subscribe`, the messages starts flowing automatically. 
- Subscribe function is also setup as an async action creator called `openConnection` which takes `url path` and `sql query` as a parameters. Hence this action can be reused, if need, to subcribe to other queries on other screens as well.

  *Issue with SQL Result Data Model*
  - Data model of the result recieved in response to the quuery is not consistent and because of this `MessageList` was causing issue beucase it assumes at least 2 keys `key` and `value` with type `Map/object/Dictionary` but that is not the case with `cc_payments` and hence I had to make some adjustments to `MessageList` so that result can be easily parsed.

  - This also prevented to `type` Message object because each topic generates different data model.



## Part 2 - Unsubscribe and converting of Message List to functional component
- My main task for Part-2 of the test was converting `MessageList` to functional component as I did not get a chance to demonstrate core React skills and I thought this can be a good opportunity to do that.

- In addition I also did unsubscribe task as well but I am not sure if it is correct, since it does not unsubscribes a particular Topic, but it unsubscribes the query which was subscribed in the previous task. Default values is `10000` but can also be overridden by a prop to `Subscribe` component.