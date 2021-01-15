let Navbar = {
    render: async () => {
        return `
            <section class='navbar-section'>
                <a href='/#/' class='navbar-brand text-bold mr-2'>APP2</a>
            </section>
             <section class="navbar-section">
                <div class="input-group input-inline">
                  <input id="search" class="form-input" type="text" placeholder="search">
                </div>
              </section>
        `
    },
    after_render: async () => {
        document.getElementById('search').addEventListener(
            'keyup',
            async () => {
                if (search.value.length > 2) {
                    window.location.hash=`#/page/1?search=${search.value}`;
                } else if (search.value.length === 0) {
                    window.location.hash=`#/page/1`;
                }
            }
        )

    }
}

export default Navbar;
