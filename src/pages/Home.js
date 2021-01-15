let courses;

let Home = {
    render : async () => {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let request = url.split("/");
        request = request.length === 2 ? ["", "page", "1"] : request;
        let verb = request[2].split("?");
        let page = verb[0];
        let query = null;
        let search = document.getElementById('search');
        search.focus()
        if (verb.length === 2) {
            query = verb[1].split("=")[1];
            search.value = query;
        }
        let query_param = query ? `?search=${query}` : '';
        const courses_req = await fetch(`http://localhost:80/courses?page=${page}${query_param.replace('?', '&')}`)
        courses = await courses_req.json();
        let coursesHTML;
        if (courses.rows === 0) {
            return `
                <div class='column col-12' style='width:100vw'>
                    <div class='panel m-2' style='height:50%'>
                        <div class='panel-body p-2'>
                            <div class='empty m-2' style='padding-top:30%;padding-bottom:78%'>
                                <div class='empty-icon'>
                                    <i class='icon icon-3x icon-emoji'></i>
                                </div>
                                <p class='empty-title h5'>There are no Courses</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;;
        } else {
            let coursesRows = '';
            for (let course of courses.result) {
                coursesRows += `
                    <tr>
                        <td>${course.name}</td>
                        <td>${course.description}</td>
                        <td>${course.professor}</td>
                        <td>${course.department}</td>
                    </tr>
                `
            }
            let pagination = '';
            for (let num of Array(Math.ceil(courses.rows/3)).keys()) {
                num += 1;
                if (num === courses.page) {
                    pagination += `
                        <li class="page-item active">
                            <a href="/#/page/${num}${query_param}">${num}</a>
                        </li>
                    `;
                } else {
                    pagination += `
                        <li class="page-item">
                            <a href="/#/page/${num}${query_param}">${num}</a>
                        </li>
                    `;

                }
            }
            let previous = courses.previous ? `<li class="page-item">
                                <a href="${courses.previous}" tabindex="-1">Previous</a>
                                </li>
                                ` : `<li class="page-item disabled">
                                <a href="/#/" tabindex="-1">Previous</a>
                                </li>`;
            let next = courses.next ? `<li class="page-item">
                                <a href="${courses.next}">Next</a>
                                </li>
                                ` : `<li class="page-item disabled">
                                <a href="/#/">Next</a>
                                </li>`;

            return `
                <div class='column col-12'>
                    <div class='panel m-2' style='height:50%'>
                     <div class="panel-header">
                        <div id='search_hint' class="panel-title"></div>
                      </div>
                        <div class='panel-body'>
                            <table class='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Professor</th>
                                        <th>Department</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${coursesRows}
                                </tbody>
                            </table>
                            <ul class="pagination">
                            ${previous}
                            ${pagination}
                            ${next}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        }

    }
    , after_render: async () => {
        let sign = courses.more ? 'more' : 'less';
        document.getElementById('search_hint').innerHTML =
        `your search returned a little ${sign} than ${courses.estimate} results` ;
    }

}

export default Home;
