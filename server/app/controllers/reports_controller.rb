class ReportsController < ApplicationController
  def index
    reports = policy_scope(Report).all.order(created_at: :asc)
    render json: reports, status: :ok
  end

  def create
    report = Report.new(report_params)
    if report.save
      render json: { message: 'Report has been sent to us' }, status: :ok
    else
      render json: { message: "Can't send report" }, status: :internal_server_error
    end
  end

  def destroy
    report = Report.find(params[:id])
    if report.destroy
      render json: { message: 'Report deleted' }, status: :ok
    else
      render json: { message: 'Unsuccessfully deleted' }, status: :internal_server_error
    end
  end

  private

  def report_params
    params.require(:report).permit(:reportable_id, :reportable_type, :content)
  end
end
