<script>
  import CustomTable from '../components/Table.svelte'
  import { table_data, role } from '../store'

  let items = []
  let _role = ''

  table_data.subscribe((val) => (items = val))
  role.subscribe((val) => (_role = val))
</script>

<main>
  <CustomTable {items} {_role} />
</main>
