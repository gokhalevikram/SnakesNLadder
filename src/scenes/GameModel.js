export default class GameModel
{
    
    MAX_VAL = 100
    
    players = {
        "red": 0,
        "brown":0
    }

    player_turn_idx = "red"
    dice_value = 1

    snakes = {
        16: 6,
        46: 25,
        49: 11,
        62: 19,
        64: 60,
        74: 53,
        89: 68,
        92: 88,
        95: 75,
        99: 88
    }

    ladders = {
        2: 38,
        7: 14,
        8: 31,
        15: 26,
        21: 42,
        28: 84,
        36: 44,
        51: 67,
        71: 91,
        78: 98,
        87: 94
    }

    snake_bite = [
        "boohoo",
        "bummer",
        "snake bite",
        "oh no",
        "dang"
    ]
    
    ladder_jump = [
        "woohoo",
        "woww",
        "nailed it",
        "oh my God...",
        "yaayyy"
    ]

    /*
    got_snake_bite()
    {
        print("\n" + random.choice(snake_bite).upper() + " ~~~~~~~~>")
        print("\n" + player_name + " got a snake bite.)
    }

    got_ladder_jump(old_value, current_value, player_name)
    {
        print("\n" + random.choice(ladder_jump).upper() + " ########")
    }
    */
    
    setPlayerPos()
    {
        // If player exceed MAX_VAL, do nothing
        console.log('Inside setPlayerPos')
        console.log('Current player :', this.player_turn_idx)
        console.log(this)
        var msg = ""
        if((this.players[this.player_turn_idx] + this.dice_value) > this.MAX_VAL)
        {
            msg = "You need to get exactly ", this.players[this.player_turn_idx] - this.MAX_VAL, " to win!! Keep trying"
        }
        else
        {
            this.players[this.player_turn_idx] += this.dice_value // set new position for this player
            if(this.players[this.player_turn_idx] == this.MAX_VAL)
            {
                msg = "Yayy ", this.player_turn_idx, " wins the game. Congrats!!!"
            }
            else
            {
                msg = "" // Do nothing
            }
        }

        console.log('Current pos for ', this.player_turn_idx, ' is ', this.players[this.player_turn_idx])
        console.log(this)
        return msg
    }

    setFinalPos()
    {
        var cur_pos = this.players[this.player_turn_idx]
        var new_pos = 0
        var msg = ""

        if (cur_pos in this.snakes)
        {
            new_pos = this.snakes[cur_pos]
            msg = "Ouch ... ", this.player_turn_idx, " got snake bite"
        }    
        else
        {
            if(this.players[this.player_turn_idx] in this.ladders)
            {
                new_pos = this.ladders[cur_pos]
                msg = "Wow ... ", this.player_turn_idx, " got ladder jump"
            }
            else
            {
                new_pos = cur_pos
                msg = "Its turn for ", this.player_turn_idx
            }
        }

        this.players[this.player_turn_idx] = new_pos
        return

    }
}