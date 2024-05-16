# Total Secrecy
### The Discord adaptation of a popular social manipulation game.

#### !! This bot is unfinished, expect bugs !!

## Commands

All commands are prefixed with `/`

### Game Commands

- `/start`: Starts a new round of Total Secrecy.
- `/end`: Ends the current game.
- `/join`: Joins the current game.
- `/leave`: Leaves the current game.
- `/status`: Lists who is currently playing.
- `/round`: Provides admin information about the current round/game.
- `/task`: Returns currently assigned task.
- `/listtasks`: Lists all possible tasks.

## Environment Variables

- `TOKEN`: Your Discord bot token.
- `GUILD_ID`: Your server ID.
- `CLIENT_ID`: The bot's application ID.
- `MONGODB_URI`: A full MongoDB URI pointing to an active database.

## Database Setup

### Schema

> Format is `database.collection`

`data.bots`

```js
{
    _id: <objectId>,
    isGame: <boolean>,
    announcementChannel: <channelId>,
    adminRole: <roleId>,
    playerRole: <roleId>,
    server: <serverId>,
    heart: <uuid>
}
```

`data.scores`

```js

{
    _id: <objectId>,
    server: <serverId>,
    scores: [
        {
            user: <userId>,
            score: <integer>
        }
    ]
}

```

`data.players`

```js

{
    id: <userId>,
    username: <username>,
    task: <taskNumber>,
    failed: <boolean>,
    score: <integer>
}

```

### Additional information

<blockquote>

The following Environment Variables have been moved to a database document:

- `ADMIN_ROLE`: Your server's admin role ID.
- `PLAYER_ROLE`: Your server's player role ID.
- `ANNOUNCEMENT_CHANNEL`: The ID of the game announcement channel in your server.

Additional documentation will follow in the coming development cycle.

</blockquote>

## To Do

<small>(imported from TrackTask)</small>

- [ ] Add more tasks
- [ ] Implement scoring
- [ ] Modularize
- [ ] Reroll for harder task?
- [ ] Implement time limit