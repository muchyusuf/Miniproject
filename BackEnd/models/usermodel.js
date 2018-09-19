function User(userdata) {
    this._id = userdata._id
    this.username = userdata.username
    this.m_role_id = userdata.password
    this.m_employee_id = userdata.employe_id
    this.is_delete = userdata.is_delete
    this.created_by = userdata.created_by
    this.created_date = userdata.created_date
    this.updated_by = userdata.updated_by
    this.updated_date = userdata.updated_date
}
module.exports = User
