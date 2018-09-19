function M_user(m_comp_data){
    this._id=m_comp_data._id
    this.username=m_comp_data.username
    this.password=m_comp_data.password
    this.m_role_id=m_comp_data.m_role_id
    this.m_employee_id=m_comp_data.m_employee_id
    this.is_delete=m_comp_data.is_delete
    this.created_by=m_comp_data.created_by
    this.created_date= m_comp_data.created_date
    this.update_by=m_comp_data.update_by
    this.update_date=m_comp_data.update_date
}

module.exports = M_user