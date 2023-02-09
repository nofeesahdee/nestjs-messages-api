import { Body, Controller, Get, Param, Post, NotFoundException } from '@nestjs/common';
import { createMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.services';

@Controller('/messages')
export class MessagesController {
    messagesService: MessagesService;

    constructor() {
      this.messagesService = new MessagesService();
    }
    @Get()
    getMessages(){
        return this.messagesService.findAll();
    }

    @Post()
    createMessages(@Body() body: createMessageDto){
        console.log(body)
        return this.messagesService.create(body.content);
    }

    @Get('/:id')
    getMessage(@Param() id: string){
        const message = this.messagesService.findOne(id);

        if (!message) {
            throw new NotFoundException('message not found');
        }

        return message
    }
}


