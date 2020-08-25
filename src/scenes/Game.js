import Phaser from '../lib/phaser.js'
import GameModel from './GameModel.js';

export default class Game extends Phaser.Scene
{
    /** @type {Phaser.Physics.Arcade.Sprite} */
    player1
    player2
    // player1_pos = 0;
    DICE_FACE = 6

    // Create new game model that maintains the state for the game
    model = new GameModel()
    
    BOARD_SIZE_IN_SQUARES = 10

    player_turn_text = [
        "Your turn.",
        "Go.",
        "Please proceed.",
        "Lets win this.",
        "Are you ready?"
    ]


    constructor()
    {
        super('game');
    }

    rollDice()
    {
        this.model.dice_value = Phaser.Math.Between(1, 6)
        console.log('Dice value : ', this.model.dice_value)
    }

    got_snake_bite(old_value, current_value, player_name)
    {
        print("\n" + random.choice(snake_bite).upper() + " ~~~~~~~~>")
        print("\n" + player_name + " got a snake bite. Down from " + str(old_value) + " to " + str(current_value))
    }

    got_ladder_jump(old_value, current_value, player_name)
    {
        print("\n" + random.choice(ladder_jump).upper() + " ########")
        print("\n" + player_name + " climbed the ladder from " + str(old_value) + " to " + str(current_value))
    }

    getFinalPos()
    {
        var current_val = this.player1_pos;
        var final_val;

        if(current_val in this.snakes)
        {
            final_val = this.snakes[current_val];
        }
        else
        {
            if(current_val in this.ladders)
            {
                final_val = this.ladders[current_val];
            }
            else
            {
                final_val = current_val;
            }
        }

        console.log('player1', this.player1_pos);

        this.player1_pos = final_val;

    }

    movePlayerFinal()
    {
        var new_x_pos = 0
        var new_y_pos = 0
        var player
        var pos
        var row
        var col

        var x_y_increments // How many inrements of x and y from current position
        const x_step = 2 // move x in steps of 2
        var y_step // move y in y steps
        var x_beg, x_end
        var y_beg, y_end
        var x_step_mult, y_step_mult // multiplier for step

        if(this.model.player_turn_idx == "red")
        {
            console.log('setting player1')
            player = this.player1
            pos = this.model.players['red']

        }
        else
        {
            console.log('setting player2')
            player = this.player2
            pos = this.model.players['brown']
        }    

        row = (Math.ceil(pos / 10))

        if(row % 2 === 1)
        {
            if(pos%10 === 0)
                col = pos / row
            else
                col = pos % 10
        }
        else
        {
            if(pos%10 === 0)
                col = 10 - (pos / row) + 1
            else
                col = 10 - (pos % 10) + 1
        }

        new_x_pos = ((col - 1) * (this.board.displayWidth / 10)) + 40
        new_y_pos = ((10 - row) * (this.board.displayHeight / 10)) + 40
   
        if(new_x_pos != player.x)
        {
            if(new_x_pos > player.x)
            {
                x_y_increments = (new_x_pos - player.x) / x_step
                x_beg = player.x
                x_end = new_x_pos
                x_step_mult = 1 
            }
            else
            {
                x_y_increments = (player.x - new_x_pos) / x_step
                x_beg = new_x_pos
                x_end = player.x
                x_step_mult = -1 
            }
        }

        if(new_y_pos != player.y)
        {
            if(new_y_pos > player.y)
            {
                y_step = (new_y_pos - player.y) / x_y_increments
                y_beg = player.y
                y_end = new_y_pos
                y_step_mult = 1 
            }
            else
            {
                y_step = (player.y - new_y_pos) / x_y_increments
                y_beg = new_y_pos
                y_end = player.y
                y_step_mult = -1 
            }
        }

        for(;x_beg < x_end;)
        {
            x_beg += x_step
            player.x += (x_step * x_step_mult)
            player.y += (y_step * y_step_mult)
        }

        player.x = new_x_pos
        player.y = new_y_pos
    }

    movePlayer()
    {
        var player;
        var pos;
        var row
        var col
        
        console.log('Within movePlayer')

        if(this.model.player_turn_idx == "red")
        {
            console.log('setting player1')
            player = this.player1
            pos = this.model.players['red']

        }
        else
        {
            console.log('setting player2')
            player = this.player2
            pos = this.model.players['brown']
        }    

        console.log(player)
        console.log('Current player : ', this.model.player_turn_idx)
        console.log('Current pos : ', pos)
        console.log('Current dice val : ', this.model.dice_value)


        for(let i = pos-this.model.dice_value+1; i <= pos; i++)
        {
            //this.addDelay()
            row = (Math.ceil(i / 10))
    
            if(row % 2 === 1)
            {
                if(i%10 === 0)
                    col = i / row
                else
                    col = i % 10
            }
            else
            {
                if(i%10 === 0)
                    col = 10 - (i / row) + 1
                else
                    col = 10 - (i % 10) + 1

            }
            
            player.x = ((col - 1) * (this.board.displayWidth / 10)) + 40
            player.y = ((10 - row) * (this.board.displayHeight / 10)) + 40
        }

    }

    preload()
    {
        console.log("Loading image ...");
        this.load.image("board", "src/assets/ULAR.jpg");
        this.load.image("black", "src/assets/pieceBlack_border11.png");
        this.load.image("white", "src/assets/pieceWhite_border11.png");
    }

    create()
    {
        var old_val;
        var row;
        var col;

        console.log("This is game.js create");
        this.board = this.add.image(400, 400, "board");
        this.board.displayHeight = 800;
        this.board.displayWidth = 800;

        console.log('Adding text')
        this.add.text(825, 25, 'Welcome to Snakes and ladder game. Red takes first turn', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })

        this.player1 = this.add.sprite(25, 760, 'black');
        // this.player1.setScale(0.5);

        this.player2 = this.add.sprite(55, 760, 'white'); // set brown sprite slightly spaced from red
        // this.player2.setScale(0.5);
        
        // Set board interactive to handle mouse clicks
        this.board.setInteractive();

        this.board.on('pointerup', function (pointer) {

            console.log('up');
            
            this.rollDice()
            var msg = this.model.setPlayerPos()
            this.add.text(825, 100, msg, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })

            this.movePlayer()

            msg = this.model.setFinalPos()
            this.add.text(825, 200, msg, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })

            this.movePlayerFinal()

            if(this.model.player_turn_idx == "red")
                this.model.player_turn_idx = "brown"
            else
                this.model.player_turn_idx = "red"

        }, this);

        // const target_x = ((this.dice_face + this.player1_pos) - 1) * this.game.displayWidth / 10;
        // console.log(target_x);


    }

    update(t, dt)
    {
        

    }
 
}