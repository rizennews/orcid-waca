'use client'

function getEmbedInfo(url: string, hostname: string): { src: string } | null {
  try {
    const u = new URL(url)

    if (u.hostname.includes('youtube.com') || u.hostname === 'youtu.be') {
      let id = ''
      if (u.hostname === 'youtu.be') id = u.pathname.slice(1)
      else if (u.searchParams.has('v')) id = u.searchParams.get('v')!
      else if (u.pathname.startsWith('/embed/')) id = u.pathname.split('/')[2]
      if (id) return { src: `https://www.youtube.com/embed/${id}?autoplay=1` }
    }

    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean)[0]
      if (/^\d+$/.test(id)) return { src: `https://player.vimeo.com/video/${id}?autoplay=1` }
    }

    if (u.hostname.includes('facebook.com') || u.hostname.includes('fb.com')) {
      return { src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&autoplay=1` }
    }

    if (u.hostname.includes('twitch.tv')) {
      const videoMatch = url.match(/twitch\.tv\/videos\/(\d+)/)
      if (videoMatch) return { src: `https://player.twitch.tv/?video=${videoMatch[1]}&parent=${hostname}&autoplay=true` }
    }

    if (u.hostname.includes('dailymotion.com') || u.hostname.includes('dai.ly')) {
      const id = u.pathname.split('/').filter(Boolean).pop()?.split('_')[0]
      if (id) return { src: `https://www.dailymotion.com/embed/video/${id}?autoplay=1` }
    }

    if (u.hostname.includes('wistia.com') || u.hostname.includes('wi.st')) {
      const match = url.match(/wistia\.(?:com|net)\/(?:medias|embed)\/(?:iframe\/)?([^?]+)/)
      if (match) return { src: `https://fast.wistia.net/embed/iframe/${match[1]}?autoplay=true` }
    }

    if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(u.pathname)) {
      return { src: url }
    }

    // Kaltura (video.wacren.net)
    if (u.hostname.includes('video.wacren.net') || u.hostname.includes('kaltura')) {
      const entryId = u.pathname.split('/').filter(Boolean).find(s => /^\d_\w+$/.test(s)) || ''
      if (entryId) {
        return { src: `https://api.kaltura.nordu.net/p/384/sp/38400/embedIframeJs/uiconf_id/23453416/partner_id/384?iframeembed=true&playerId=kaltura_player&entry_id=${entryId}&flashvars[streamerType]=auto&flashvars[localizationCode]=en&flashvars[sideBarContainer.plugin]=true&flashvars[sideBarContainer.position]=left&flashvars[sideBarContainer.clickToClose]=true&flashvars[chapters.plugin]=true&flashvars[chapters.layout]=vertical&flashvars[chapters.thumbnailRotator]=false&flashvars[streamSelector.plugin]=true&flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&flashvars[dualScreen.plugin]=true&flashvars[hotspots.plugin]=1&flashvars[Kaltura.addCrossoriginToIframe]=true` }
      }
    }

    return null
  } catch {
    return null
  }
}

export default function VideoPlayer({ url, title }: { url: string; title: string }) {
  const embed = getEmbedInfo(url, typeof window !== 'undefined' ? window.location.hostname : 'localhost')

  if (!embed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-zinc-900 p-6 text-center">
        <p className="text-zinc-400 text-sm">Unable to embed this video.</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline text-sm">
          Open in new tab
        </a>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full bg-black">
      <iframe
        src={embed.src}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
