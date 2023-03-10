class CommentsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]

  def index
    comments = Video.find(params[:video_id]).comments.includes(:user)
    options = { include: [:user] }
    render json: CommentSerializer.new(comments, options).serializable_hash
  end
  
  def create
    comment = Comment.new(content: comment_params[:content], video_id: params[:video_id], user_id: current_user.id)
    authorize comment
    if comment.save
      render json: comment, status: :created
    else
      render json: { message: "Unsuccessfully comment" }, status: :internal_server_error
    end
  end

  def destroy
  end

  def update
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end
end
