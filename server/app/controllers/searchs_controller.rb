class SearchsController < ApplicationController
  include Pagy::Backend

  def search
    results = SearchService.call(params[:type], params[:query], date_params, params[:page], current_user, params: params)

    if results
      render json: results, status: :ok
    else
      render json: { message: 'Some thing went wrong' }, status: :internal_server_error
    end
  end

  private

  def date_params
    if %w[hour day week month year].include?(params[:date])
      1.send(params[:date]).ago
    else
      1.month.ago
    end
  end
end
