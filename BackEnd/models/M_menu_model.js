tanggal = new Date()
let dd = tanggal.getDate()
let mm = tanggal.getMonth() + 1
let yyyy = tanggal.getFullYear()
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}

function M_menu(m_menu_data){
    this._id=m_menu_data._id
    this.code=m_menu_data.code
    this.name=m_menu_data.name
    this.controller=m_menu_data.controller
    this.parent_id=m_menu_data.parent_id
    this.is_delete=m_menu_data.is_delete
    this.created_by=m_menu_data.created_by
    this.created_date= m_menu_data.created_date
    this.update_by=m_menu_data.update_by
    this.update_date=m_menu_data.update_date
}
M_menu.prototype.getData = function(){
    return {
        _id : this._id,
        code : this.code,
        name : this.name,
		controller : this.controller,
		parent_id : this.parent_id,
		is_delete : this.is_delete,
		created_by : this.created_by,
		created_date : this.created_date,
		update_by : this.update_by,
		update_date : this.update_date
    }
}
module.exports = M_menu