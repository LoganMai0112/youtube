class CommentsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]
  before_action :set_comment, only: %i[update destroy]

  def index
    comments = Video.find(params[:video_id]).comments.includes({ user: { avatar_attachment: :blob } })
    comments = policy_scope(comments)
    options = { include: [:user] }
    render json: CommentSerializer.new(comments, options).serializable_hash
  end

  def create
    comment = Comment.new(content: comment_params[:content], video_id: params[:video_id], user_id: current_user.id)
    authorize comment
    if comment.save
      render json: comment, status: :created
    else
      render json: { message: 'Unsuccessfully comment' }, status: :internal_server_error
    end
  end

  def destroy
    authorize @comment
    if @comment.destroy
      render json: { message: 'Comment deleted' }, status: :ok
    else
      render json: { message: "Can't delete comment" }, status: :internal_server_error
    end
  end

  def update
    authorize @comment
    @comment.update(comment_params)
    if @comment.save
      render json: @comment, status: :ok
    else
      render json: { message: 'Update comment fail' }, status: :internal_server_error
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end
end
