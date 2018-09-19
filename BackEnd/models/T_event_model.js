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

function T_event(m_comp_data){
    this._id=m_comp_data._id
    this.code=m_comp_data.code
    this.event_name=m_comp_data.event_name
    this.start_date=m_comp_data.start_date
    this.end_date=m_comp_data.end_date
    this.event_place=m_comp_data.event_place
    this.budget=m_comp_data.budget
    this.request_by=m_comp_data.request_by
    this.request_date=m_comp_data.request_date
    this.approved_by=m_comp_data.approved_by
    this.approved_date=m_comp_data.approved_date
    this.assign_to=m_comp_data.assign_to
    this.closed_date=m_comp_data.closed_date
    this.note=m_comp_data.note
    this.status=m_comp_data.status
    this.reject_reason=m_comp_data.reject_reason
    this.is_delete=m_comp_data.is_delete
    this.created_by=m_comp_data.created_by
    this.created_date= m_comp_data.created_date
    this.update_by=m_comp_data.update_by
    this.update_date=m_comp_data.update_date
}
T_event.prototype.getData = function(){
    return {
        _id : this._id,
        code : this.code,
        event_name : this.event_name,
        start_Date :this.start_date,
        end_Date :this.end_date,
        event_place : this.event_place,
        budget : this.budget,
        request_by : this.request_by,
        request_date : this.request_date,
        approved_by : this.approved_by,
        approved_date : this.approved_date,
        assign_to : this.assign_to,
        closed_date : this.closed_date,
        note : this.note,
        status : this.status,
        reject_reason : this.reject_reason,
		is_delete : this.is_delete,
		created_by : this.created_by,
		created_date : this.created_date,
		update_by : this.update_by,
		update_date : this.update_date
    }
}
module.exports = T_event