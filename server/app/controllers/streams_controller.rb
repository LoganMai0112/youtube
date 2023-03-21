class StreamsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]
  before_action :set_stream, only: %i[update destroy show]

  def index
    streams = Stream.where(streaming: true).limit(5)
    render json: StreamSerializer.new(streams).serializable_hash
  end

  def create
    stream = Stream.new(stream_params)
    authorize stream

    if stream.save
      render json: StreamSerializer.new(stream).serializable_hash[:data][:attributes], status: :created
    else
      render json: { message: "Can't create stream" }, status: :internal_server_error
    end
  end

  def update
    authorize @stream
    if @stream.update(stream_params)
      render json: @stream, status: :accepted
    else
      render json: { message: 'Unsuccessfully updated' }, status: :internal_server_error
    end
  end

  def destroy
    if @stream.destroy
      render json: { message: 'Deleted' }, status: :ok
    else
      render json: { mesage: 'Fail to delele' }, status: :internal_server_error
    end
  end

  def show
    authorize @stream
    options = { include: [:user] }
    render json: StreamSerializer.new(@stream, options).serializable_hash, status: :ok
  end

  private

  def set_stream
    @stream = Stream.find(params[:id])
  end
  
  def stream_params
    params.require(:stream).permit(:user_id, :title, :description, :source, :streaming, :thumbnail)
  end
end
