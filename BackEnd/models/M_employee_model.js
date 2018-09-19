function M_company(m_employee_data){
    this._id=m_employee_data._id
    this.employee_number=m_employee_data.employee_number
    this.first_name=m_employee_data.first_name
    this.last_name=m_employee_data.last_name
    this.m_company_id=m_employee_data.m_company_id
    this.email=m_employee_data.email
    this.is_delete=m_employee_data.is_delete
    this.created_by=m_employee_data.created_by
    this.created_date= m_employee_data.created_date
    this.update_by=m_employee_data.update_by
    this.update_date=m_employee_data.update_date
}
M_company.prototype.getData = function(){
    return {
        _id : this._id,
        employee_number : this.employee_number,
        first_name : this.first_name,
		last_name : this.last_name,
		m_company_id : this.m_company_id,
		email : this.email,
		is_delete : this.is_delete,
		created_by : this.created_by,
		created_date : this.created_date,
		update_by : this.update_by,
		update_date : this.update_date
    }
}
module.exports = M_company