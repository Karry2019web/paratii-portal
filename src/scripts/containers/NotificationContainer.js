/* @flow */

import { connect } from 'react-redux'
import type { RootState } from 'types/ApplicationTypes'
import Notification from 'components/Notification'

const mapStateToProps = (state: RootState) => {
  const notifications = state.notifications || []

  // Deduplicate notifications: keep only the most recent instance of each
  // notification keyed by title + message. If a duplicate is found, we
  // keep the first occurrence to avoid stacking identical notifications.
  const seen = new Set()
  const deduped = []
  for (const notif of notifications) {
    const key = (notif.title || '') + '::' + (notif.message || '')
    if (!seen.has(key)) {
      seen.add(key)
      deduped.push(notif)
    }
  }

  return { notifications: deduped }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
