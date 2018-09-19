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
// data.created_date = dd+'/'+mm+'/'+yyyy

function M_role(m_comp_data){
    this._id=m_comp_data._id
    this.code=m_comp_data.code
    this.name=m_comp_data.name
    this.description=m_comp_data.description
    this.is_delete=m_comp_data.is_delete
    this.created_by=m_comp_data.created_by
    this.created_date= m_comp_data.created_date
    this.update_by=m_comp_data.update_by
    this.update_date=m_comp_data.update_date
}
M_role.prototype.getData = function(){
    return {
        _id : this._id,
        code : this.code,
        name : this.name,
		description : this.description,
		is_delete : this.is_delete,
		created_by : this.created_by,
		created_date : this.created_date,
		update_by : this.update_by,
		update_date : this.update_date
    }
}
module.exports = M_role