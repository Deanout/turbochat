class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  scope :all_except, ->(user) { where.not(id: user) }

  enum status: %i[online away offline]

  after_create_commit { broadcast_append_to 'users' }
  after_update_commit { broadcast_update }

  has_many :messages, dependent: :destroy
  has_one :room
  has_one_attached :pfp

  after_commit :add_default_pfp, on: %i[create update]

  def pfp_thumbnail
    pfp.variant(resize_to_limit: [150, 150]).processed
  end

  def chat_pfp
    pfp.variant(resize_to_limit: [50, 50]).processed
  end

  def status_to_css
    case status
    when 'online'
      'bg-success'
    when 'away'
      'bg-warning'
    when 'offline'
      'bg-dark'
    else
      'bg-dark'
    end
  end

  private

  def broadcast_update
    broadcast_replace_to 'user_status', partial: 'users/status', user: self
  end

  def add_default_pfp
    return if pfp.attached?

    pfp.attach(
      io: File.open(Rails.root.join('app', 'assets', 'images', 'default_profile.jpg')),
      filename: 'default_profile.jpg',
      content_type: 'image/png'
    )
  end
end
