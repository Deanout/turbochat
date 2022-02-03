class RoomChannel < ApplicationCable::Channel
  before_subscribe :set_room, except: [:unsubscribed]

  def subscribed
    # stream_from "some_channel"
    stream_from "chat_#{@room}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    ActionCable.server.broadcast("chat_#{@room}", data)
  end

  private

  def set_room
    @room = Room.find(params[:room])
  end
end
