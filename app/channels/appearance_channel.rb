class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from 'appearance_channel'

    broadcast_new_status(User.statuses[:online])
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    broadcast_new_status(User.statuses[:offline])
  end

  def online(_data)
    status = User.statuses[:online]
    broadcast_new_status(status)
  end

  def away
    puts 'Away'
    puts User.statuses[:away]

    broadcast_new_status(User.statuses[:away])
  end

  private

  def broadcast_new_status(status)
    current_user.update(status: status)
  end
end
