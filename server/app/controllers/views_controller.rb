class ViewsController < ApplicationController
  def update
    view = View.where(video_id: params[:video_id]).first_or_create(video_id: params[:video_id], number: 0)
    count = view.number
    if view.update(number: count + 1)
      render json: view, status: :ok
    else
      render json: { message: "Can't increase view" }, status: :internal_server_error
    end
  end
end
